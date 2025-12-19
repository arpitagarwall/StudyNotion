const Categories = require("../models/Categories");

exports.createCategory = async (req,res) => {
    try{
        const {name, description} = req.body;

        if(!name || !description){
            return res.status(400).json({
            success:false,
            message:"All feilds are required"
            });
        }

        const categoryDetails = await Categories.create({name:name, description:description});

         return res.status(200).json({
            success:true,
            message:"Category created successfully"
            });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
            });
    }
}

exports.showAllCategories = async (req,res) => {
    try{
        const allCategories = await Categories.find({}, {name:true, description:true})

         return res.status(200).json({
            success:true,
            message:"All Category return successfully",
            allCategories
            });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
            });
    }
}

exports.categoryPageDetails = async (req,res) => {
    try{
        const {categoryId} = req.body;

        const selectdCategory = await Categories.findById(categoryId).populate("courses").exec();

        if(!selectdCategory){
            return res.status(404).json({
            success:false,
            message:"Data not found"
            });
        }

        const differentCategories = await Categories.find({_id:{$ne:categoryId}}).populate("courses").exec();


         return res.status(200).json({
            success:true,
            message:"Selected Category return successfully",
            data:{selectdCategory,differentCategories}
            });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
            });
    
    }
}