const User = require("../models/User");
const Otp = require("../models/Otp");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailSender = require("../utilities/EmailSender");
const passwordTemplate = require("../templates/passwordUpdate")
require("dotenv").config();


exports.sendOtp = async (req,res) => {
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if (checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            })
        }

        var newOtp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        let result = await Otp.findOne({otp:newOtp});

        while(result){
            newOtp = otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result = await Otp.findOne({otp:newOtp});
        }

        const otpPayload = {email,otp:newOtp};
        const otpBody = await Otp.create(otpPayload);

        return res.status(200).json({
            success:true,
            message: "Otp sent successfully",
            data:otpPayload
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User already exists"
        })

    }
}


exports.signUp = async (req,res) => {

    try{

        const {firstName, 
        lastName, 
        email, 
        contactNumber, 
        password, 
        confirmPassword, 
        accountType, 
        otp} = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType){
            return res.status(403).json({
                success:false,
                message:"All feilds required"
            });
        }

        if (password !== confirmPassword){

            return res.status(400).json({
                success:false,
                message:"Password and confirm password does not match"
            });
        }

        const existingUSer = await User.findOne({email});

        if(existingUSer){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            });
        }

        const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp[0].otp);
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"Otp not found"
            });
        }
        else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Otp does not match"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:contactNumber
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}+${lastName}`

        })
        console.log(user);
        console.log(profileDetails);
         return res.status(200).json({
                success:true,
                message:"User is registered Succcessfully",
                user
            });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
                success:false,
                message:"User cannot be registered. Please try again later"
        });

    }
}

exports.login = async (req,res) => {

    try{

        const {email, password} = req.body;

        if (!email || !password){
             return res.status(403).json({
                success:false,
                message:"All feilds are required"
            });
        }

        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
             return res.status(401).json({
                success:false,
                message:"User not registered. Please Sign-Up"
            });
        }

        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            });

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true
            }

            res.cookie("token", token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in successfully"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is incorrect"
            });
        }
    }
    catch(error){
        console.log(error);
         return res.status(500).json({
                success:false,
                message:"Login failed. Please try again"
            });

    }

}


exports.changePassword = async (req,res) => {
    try{

        const userDetails = await User.findById(req.user.id);

        if(!userDetails){
             return res.status(401).json({
                success:false,
                message:"User not registered. Please Sign-Up"
            });
        }

        const { oldPassword, newPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);

        if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The old password is incorrect" });
		}

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

        try {
			const emailResponse = await emailSender(
				updatedUserDetails.email,
                "Password Change Notification",
				passwordTemplate(updatedUserDetails.email,`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}
        
        return res.status(200).json({
            success:true,
            message:"Password change successful"
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Change password failed. Please try again later"
        });
    }
}