import nodemailer from 'nodemailer'
import 'dotenv/config'

export const sentOTPMail = async(otp, email)=>{
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const mailconfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject:'Password Reset OTP',
    html:`<p>Your OTP for password reset is:<b>${otp}</b> </p>`
};
transporter.sendMail(mailconfigurations, function(error, info){
    // if(error) throw Error(error);
    if(error) return console.error(error);
    console.log('OTP sent Successfully');
    console.log(info);

});
}

