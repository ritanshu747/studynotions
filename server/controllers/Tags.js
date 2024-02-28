const Tags = require('../models/Tags');

//create tag ka handler function

exports.createTag = async(req,res)=>{
    try{
        const{name,description} = req.body;
        if(!name || ! description){
            return res.status(400).json({
                success:false,
                message:"Please fills all fields."
            })
        }
        //create an entry in db
    const tagDetails = await Tags.create({
        name:name,
        description:description,
    });
    console.log("tagd Details :", tagDetails);
    return res.status(200).json({
        success:true,
        message:"Tag created successfully."
    })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


//getAllTags 

exports.showAllTags = async(req,res)=>{
    try{
        const allTags = await Tags.find({},{name,description});
        console.log("all tags ",allTags);
        return res.status(200).json({
            success:true,
            message:"All tags fetch successfully.",
            allTags,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
}

