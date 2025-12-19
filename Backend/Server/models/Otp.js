const mongoose = require("mongoose");
const emailSender = require("../utilities/EmailSender");
const emailTemplate = require("../templates/emailVerificationTemplate");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
     otp:{
        type:String,
        require:true
    },
    contactNumber:{
        type:Number,
        require:false,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    },
       
});

async function sendVerificationEmail(email,otp){
    try{
        console.log(email);
        console.log(otp);
        const emailResponse = await emailSender(email, "Verification email from Study Notion", emailTemplate(otp));
        console.log("Email sent successfuly", emailResponse);
    }
    catch(error){
        console.log("Error occured while sending email", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next){
    
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})


module.exports = mongoose.model("Otp", otpSchema);