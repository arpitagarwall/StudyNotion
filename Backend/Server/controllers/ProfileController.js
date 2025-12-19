const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadFileToCloudinary} = require("../utilities/FileUploader");
const {removeFileToCloudinary} = require("../utilities/FileRemoval");

exports.updateProfile = async (req,res) => {
    try{
        const {dateOfBirth="", about="", contactNumber, countryCode, gender} = req.body;
        const id = req.user.id;

        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"All feilds are required"
            })
        }

        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);
        
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = countryCode + contactNumber;

        await profileDetails.save();

         return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profileDetails
        })
    }
    catch(error){
         return res.status(500).json({
                success:false,
                message:"Unable to update profile",
                error:error.message
            });
    }
}


//delete account

exports.deleteAccount = async (req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id);

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User not found"
            });
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User Deleted successfully"
        })

    }
    catch(error){
        return res.status(500).json({
                success:false,
                message:"Unable to delete user",
                error:error.message
            });
    }
}

exports.getAllUserDetails = async (req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

         return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            userDetails

        })
    }
    catch(error){
        return res.status(500).json({
                success:false,
                message:"Unable to get user data",
                error:error.message
            });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          model: "SubSection", 
        },
      })
      .exec();
      console.log(userDetails)

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.removeDisplayPicture = async (req, res) => {
    try {
      const imageUrl = req.body?.image;
      const userId = req.user.id

      const parts = imageUrl.split("StudyNotion/");
      const id = parts[1].split(".")[0];
      const public_id = "StudyNotion/" + id;

      const deleted = await removeFileToCloudinary(public_id);

      const userDetails = await User.findById(userId);

      const imageDicebar =`https://api.dicebear.com/5.x/initials/svg?seed=${userDetails.firstName}+${userDetails.lastName}`

      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId},
        { image: imageDicebar },
        { new: true }

      )

      res.send({
        success: true,
        message: `Image Removed successfully`,
        data: updatedProfile,
      })
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        
      })
    }
};