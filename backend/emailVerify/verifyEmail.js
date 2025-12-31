import nodemailer from 'nodemailer'
import 'dotenv/config'

export const verifyEmail = (token, email)=>{
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
const mailconfigurations = {
  from: process.env.MAIL_user,
  to: email,
  subject: "Email Verification",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Email Verification</h2>

      <p>
        Hi there,<br/><br/>
        You have recently visited our website. Please click the button below
        to verify your email address.
      </p>

      <a href="http://localhost:5173/verify/${token}"
         style="
           display: inline-block;
           padding: 12px 24px;
           margin: 20px 0;
           background-color: #ff0080;
           color: #ffffff;
           text-decoration: none;
           font-weight: bold;
           border-radius: 6px;
         ">
        CLICK & VERIFY
      </a>

      <p style="font-size: 14px; color: #555;">
        If you did not request this, please ignore this email.
      </p>

      <p style="font-size: 12px; color: gray;">
        Thanks & Regards,<br/>
        Team Ekart
      </p>
    </div>
  `

};
transporter.sendMail(mailconfigurations, function(error, info){
    if(error) throw Error(error);
    console.log('email sent Successfully');
    console.log(info);

});
}




