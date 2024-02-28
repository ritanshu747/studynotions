const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

exports.resetPasswordToken = async(req,res)=>{
    try{

        //get email from req ki body
        //db call for this email,email validatiion
        //generate token
        //update user by adding token and expiresion date
        //create url
        //send mail containing url
        //return response
        const email = req.body.email;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
        //genrate token
        const token = crypto.randomBytes(20).toString("hex");
    // Explanation:
    // crypto.randomBytes(20): Generates 20 random bytes.
    // .toString("hex"): Converts the random bytes to a
    //  hexadecimal string representation.
    //  This approach is commonly used and works fine for generating random tokens. , 
       
    //update user by adding token and expiresIn
    const expiresIn = date.now()+360000;
    const updatedDetails = await User.findOneAndUpdate(
        { email: email },
        {
            token: token,
            resetPasswordExpires: expiresIn,
        },
        { new: true }

        // Options Object: { new: true }: This option specifies 
        // that the method should return the updated document. 
        // By default, findOneAndUpdate() returns the document 
        // before the update is applied (new: false). Setting
        // new: true ensures that the method returns the updated document.
    );
    console.log("deatils ",updatedDetails);
    const url = `https://localhost:3000/update-password/${token}`;
    //sending the mail
    await mailSender(
        email,
        "Password Reset Link",
        `Your Link for email verification is ${url}. Please click this url to reset your password.`
    );
    res.json({
        success: true,
        message:
            "Email Sent Successfully, Please Check Your Email and update password.",
    });
} catch (error) {
    return res.json({
        error: error.message,
        success: false,
        message: `Some Error in Sending the Reset Message`,
    });
}
}


//reset password

exports.resetPassword = async(req,res)=>{
    try{
        //data fetch
        const{password,confirmPassword,token} = req.body;
        //validation
        // if(!password || !confirmPassword || !token){
        //     return res.status(401).json({
        //         success:false,
        //         message:"Please fils all details."
        //     })
        // }
        if(password !== confirmPassword){
            return res.status.json({
                success:false,
                message:"Please provide same password in both fields."
            })
        }
        // get user details from db using token
        const userDetails = User.findOne({token:token});
        if(!userDetails){
            return res.json({
				success: false,
				message: "Token is Invalid",
			});
        }
        //if no entry then its invalid token or time expires ho gaya
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
        }
        //if all these is complete then hashed password
        const hashedPassword = await bcrypt.hash(password,10);

        //pass word update karna hai
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        res.json({
			success: true,
			message: `Password Reset Successful`,
		});

      

    }
    catch(error){
        return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});

    }
}