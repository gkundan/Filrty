const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create a transporter for sending emails [ SMTP connect]
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wallnest9@gmail.com",
      pass: "msozgwqyagutinrk",
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.SMPT_SENDER_EMAIL, // Replace with a valid email address
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    // Send the email
    console.log(`Email sent successfully: ${info.response}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
