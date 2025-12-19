const cloudinary = require("cloudinary").v2

exports.removeFileToCloudinary = async (pulidc_id) => {

    try{
        return await cloudinary.api.delete_resources(pulidc_id);
    }
    catch(error){
        return error.message;
    }
    
}