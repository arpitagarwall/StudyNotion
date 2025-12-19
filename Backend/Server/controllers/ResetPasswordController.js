const User = require("../models/User");
const emailSender = require("../utilities/EmailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req,res) => {

    try{
        const email = req.body.email;

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                    success:false,
                    message:"Your email is not registered"
                });
        }

        const token = crypto.randomUUID();
        const updatedDetails = await User.findOneAndUpdate({email:email},{token:token, resetPasswordExpires:Date.now() + 5*60*1000},{new:true});
        const url = `http://localhost:3000/updatePassword/${token}`;

        await emailSender(email, "Password reset link", `Password reset link: ${url}`);

        return res.status(200).json({
                    success:true,
                    message:"Email sent successfully.Please chage your password"
                });
    }
    catch(error){
        console.log(error);
         return res.status(500).json({
                    success:false,
                    message:"Something went wrong while resetting password"
                });
    }
    
}


exports.resetPassword = async (req, res) => {

    try{
         const {password, confirmPassword, token} = req.body;

        if (password !== confirmPassword){
            return res.status(401).json({
                        success:false,
                        message:"Password not matching"
                    });
        }

        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.status(401).json({
                        success:false,
                        message:"Token invalid"
                    });
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                        success:false,
                        message:"Token expired"
                    });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate({token:token},{password:hashedPassword}, {new:true});

        return res.status(200).json({
                        success:true,
                        message:"Password reset successful"
                    });
        }
    catch(error){
         console.log(error);
         return res.status(500).json({
                    success:false,
                    message:"Password reset failed.Please try again later"
                });
    }

   
}