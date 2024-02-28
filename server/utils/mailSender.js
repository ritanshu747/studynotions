const nodemailer = require('nodemailer');

const mailSender = async(email,title,body)=>{
    try{
          let transporter = nodemailer.createTranport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                password:process.env.MAIL_PASSWORD,
            },
            secure:true,
            port:465,
            tls: {
                    // Reject unauthorized connections
                    rejectUnauthorized: true,
                    // Use the default cipher suites supported by Node.js
                    ciphers: 'DEFAULT'
                } 
          })
        let info = transporter.sendMail({
            from:'studyNotion || BY - Ritanshu Shivhare',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info
    }
    catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;