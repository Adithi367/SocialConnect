// import nodemailer from 'nodemailer'

// // Create a transporter using Ethereal test credentials.
// // For production, replace with your actual SMTP server details.
// const transporter = nodemailer.createTransport({
//   service:'gmail',
//   auth: {
//     user:process.env.USER_EMAIL,
//     pass:process.env.USER_PASSWORD ,
//   },
// });


// const sendEmail=async(to,subject,html)=>{
  
//   await transporter.sendMail({
//         from:process.env.USER_EMAIL,
//         to,
//         subject,
//         html:html
//     })
    
// }
// export default sendEmail;

// new 
import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, html) => {
  try {
    // Create transporter inside function to ensure env vars are loaded
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD, // App Password
      },
      tls: { rejectUnauthorized: false }, // optional for dev
    });

    // Verify transporter connection
    await transporter.verify();
    console.log("Email transporter verified");

    // Send the email
    const info = await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", info.response);

  } catch (error) {
    console.error("Error sending email in sendEmail:", error);
    throw error; // propagate error if needed
  }
};

export default sendEmail;