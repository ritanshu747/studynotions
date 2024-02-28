const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-genrator');
const Profile = require('../models/Profile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//sendotp

exports.sendotp = async(req,res)=>{
    try{
        const {email}= req.body;
        const checkUserPresent = await User.findOne({email});
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User already exits!'
            })
        }
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specilaChars:false,
        });
        console.log('otp :',otp);


        //checking for unique otp or not
        let result = await OTP.findOne({otp:otp});
        while(result){
            otp=otpGenerator(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specilaChars:false,
            })
            result= await OTP.findOne({otp:otp});
        }

        const otpPayload={email,otp};

        //creating an entry in db for otp
        const otpBody = await OTP.create(otpPayload);
        res.status(200).json({
            success:true,
            message:'OTP send successfully',
        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })

    }
}

//singup 
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, password, confirmPassword, contactNumber, email, otp, accounType } = req.body;

        if (!firstName || !lastName || !password || !confirmPassword || !contactNumber || !email || !otp) {
            return res.status(403).json({
                success: false,
                message: 'Please fill all fields',
            });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Please enter the same password!"
            });
        }

        // Checking if email already exists
        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            });
        }

        // Finding the most recent OTP stored in OTP collection
        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log('recent otp ', recentOtp);

        if (!recentOtp) {
            return res.status(400).json({
                success: false,
                message: "No OTP found."
            });
        }
        if (otp !== recentOtp.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP! Please provide a valid OTP."
            });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creating profile details
        const profileDetails = await profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
        });

        // Creating user entry in the database
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accounType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User registration failed. Please try again later."
        });
    }
};



//login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'Please fill all fields',
            });
        }

        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(401).json({
                success: false,
                message: 'User not found with this email address. Please register before login',
            });
        }

        const passwordMatch = await bcrypt.compare(password, User.password);
        if (passwordMatch) {
            const payload = {
                email: User.email,
                id: User._id,
                accountType: User.accounType,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '2h',
            });
            User.token = token;
            User.password = undefined;
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            };
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user: User,
                message: 'Logged in successfully',
            });
        } else {
            return res.status(401).json({
                success: false,
                message: 'Invalid Password!',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure, Please try again later!',
        });
    }
};

 //changePassword


 exports.chanepassword = async(req,res)=>{
    try{
        const{email,password,newPassword,confirmPassword} = req.body;

        if(!email || !password || !newPassword || !confirmPassword){
            return res.status(403).json({
                success: false,
                message: 'Please fill all fields',
            });
        }

        if(newPassword != confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Please provide the same password"
            })
        }
        const checkEmail = await User.findOne({email});

        
        if(!checkEmail){
            return res.status(400).json({
                success: false,
                message: "User doesn't exists!"
            });
        }
        if(await bcrypt.compare(password,User.password)){
            user.password=await bcrypt.hash(newPassword,10);
            return res.status(200).json({
                success: true,
                message: "Password changed successfully"
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password cannot be changed"
            });
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while changing password"
        });

    }
 }