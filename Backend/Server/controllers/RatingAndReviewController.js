const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRatingAndReview = async (req,res) => {
    try{
        const userId = req.body.id;
        
        const{raitng, review, courseId} = req.body;

        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled:{$eq:userId}});

        if(!courseDetails){
            return res.status(404).json({
            success:false,
            message:"Students not enrolled in course"
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({user:userId, course:courseId});

        if (alreadyReviewed){
            return res.status(403).json({
            success:false,
            message:"Course is already reviewed by the user"
            });
        }

        const ratingReview = await RatingAndReview.create({rating,review, course:courseId, user:userId});

        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview._id}},{new:true});

        return res.status(200).json({
            success:true,
            message:"Rating and review created Succesfully",
            data: ratingReview
        });


    }
    catch(error){
         return res.status(500).json({
            success:false,
            message:error.message
            });
    }
}

exports.getAverageRating = async (req,res) => {
    try{

        const courseId = req.body.courseId;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course : new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }

            }
        ])

        if(result.length > 0){
            return res.status(200).json({
            success:true,
            message:"Average rating created",
            data: result[0].averageRating
            });
        }

        return res.status(200).json({
            success:true,
            message:"Average rating 0, No ratings given till now",
            data: 0
            });
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}


exports.getAllRatingAndReviews = async (req,res) => {
    try{
        const allReview = await RatingAndReview.find({})
                                                .sort({rating:"desc"})
                                                .populate({path:"user",select:"firstName lastName email image"})
                                                .populate({path:"course", select:"courseName"})
                                                .exec();

         return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data: allReview
            });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}