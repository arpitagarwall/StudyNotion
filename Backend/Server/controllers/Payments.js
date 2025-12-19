const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const emailSender = require("../utilities/EmailSender");
const {courseEnrollmentEmail} = require("../templates/courseEnrollmentEmail");
const { mongoose } = require("mongoose");

exports.capturePayment = async (req,res) =>{
    try{
        const {courseId} = req.body;
        const userId = req.user.id;

        if(!courseId){
            return res.status(401).json({
                success:false,
                message: "Please provide course Id"
            })
        }

        let course = await Course.findById(courseId);

        if(!course){
             return res.status(401).json({
                success:false,
                message: "Could not find the course"
            })
        }

        const userIdObj = new mongoose.Types.ObjectId(userId);

        if(course.studentsEnrolled.includes(userIdObj)){
            return res.status(401).json({
                success:false,
                message: "Student already enrolled"
            });
        }

        const amount = course.price;
        const currency = "INR";

        const options = {
            amount : amount * 100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{courseId, userId}
        }

        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);

        return res.status(200).json({
                success:true,
                message: "Student enrolled successfuly",
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount:paymentResponse.amount

            });
    }
    catch(error){
         return res.status(500).json({
                success:false,
                message: "Course purchase failed",
                error:error.message
            });
    }
}

exports.verifySignature = async (req,res) =>{
    try{
        const webhookSecret = "123456789";
        const signature = req.headers["x-razorpay-signature"];

        const shaSum = crypto.creatHmac("sha256", webhookSecret);
        shaSum.update(JSON.stringify(req.body));
        const digest = shaSum.digest("hex");


        if(signature === digest){
            console.log("Payment authorised");
            const {courseId, userId} = req.body.payload.payment.entity.notes;

            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true});

            if(!enrolledCourse){
                return res.status(500).json({
                success:false,
                message: "Course not found",
                });
            }

            console.log(enrolledCourse);

            const enrolledStudent = await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true});

            if(!enrolledStudent){
                return res.status(500).json({
                success:false,
                message: "Student not found",
                });
            }

            console.log(enrolledStudent);

            const emailResponse = await emailSender(enrolledStudent.email,"Congratulation from StudyNotion!","Congratulation! you are onboarded in new course");

             return res.status(200).json({
                success:true,
                message: "Student enrolled successfully",
                courseName:course.courseName,
                emailResponse

            });

        }

        return res.status(400).json({
            success:false,
            message: "Invalid request",
        });

    }
    catch(error){
         return res.status(500).json({
                success:false,
                message: "Course enrollement failed",
                error:error.message
            });
    }
}