// 1-Validates the incoming request body for required fields.
// 2-Retrieves the instructor details based on the user ID.
// 3-Validates the tag details.
// 4-Uploads the thumbnail image to Cloudinary.
// 5-Creates a new course entry in the database.
// 6-Adds the newly created course to the instructor's list of courses.
// 7-Updates the tag schema to include the newly created course.
// 8-Returns a success response with the newly created course data.




const Course = require('../models/Course');
const Tags = require('../models/Tags');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUpload');


//createCourse handler function

exports.createCourse = async(req,res)=>{
    try{
        //data fetch kiya
        const{cousreName,courseDescription,whatYouWillLearn,price,tag} = req.body;
        //get thumbail
        const thumbnail = req.files.thumnailImage;

        //validtion
        if(!cousreName || ! courseDescription || !whatYouWillLearn || !price || !tag){
                return res.status(400).json({
                    success:false,
                    message:"Please fill all fields."
                })
        }
        //check for instrutor id
        const userId = req.user.id;
        const instrutorDetails = await User.findById({userId});
        console.log('Instructor details ',instrutorDetails);

        if(!instrutorDetails){
            return res.status.json({
                success:false,
                message:"Instructor Details not found",
            });
        }

        //tag validation
        const tagDetails = await Tags.findById(tag);
        if(!tag){
            return res.status.json({
                success:false,
                message:"Tag details not found",
            });
        }

        //upload thumbnail to cloudinary;
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        //creating a entry of new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instrutorDetails._id,
            whatYouWillLearn,
            price,
            thumbnail:thumbnail.secure_url,
            tag:tagDetails._id,

        })
        //add the new course to user schema of instrutor

        await User.findByIdAndUpdate(
            {_id:instrutorDetails._id},
            {
                $push:{
                courses: newCourse._id,}
            },
            {new:true},
        );

        //update the tag schema
       
       await Tags.findByIdAndUpdate(
       {_id: tagDetails._id},
       {
          $push: {
              courses: newCourse._id
           },
       },
        {new: true}
      );


        // Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});

    }
    catch(error){
        // Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
    }
}

//getAllCourse

exports.getAllCourses = async (req, res) => {
	try {
		const allCourses = await Course.find(
			{},
			{
				courseName: true,
				price: true,
				thumbnail: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: allCourses,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Course Data`,
			error: error.message,
		});
	}
};



// populate("instructor"): This tells Mongoose to replace the instructor field in each course document with the corresponding instructor document from the User collection.
// .exec(): This method executes the query. In Mongoose, queries are not executed until you explicitly call exec(), although this behavior is changing in recent versions.

// So, when you call populate("instructor") followed by exec(), Mongoose will replace the instructor field in each course document with the actual instructor document from the User collection, based on the ID reference.

// This ensures that when you return allCourses, each course object will have the instructor field populated with the instructor details, instead of just having the ID.