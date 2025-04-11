const transporter = require('./mailer');
require('dotenv').config();

const sendOtp = async (email, otp) => {
  const mailOptions = {
    from: `"Smart E-Waste System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Smart E-Waste OTP Code (valid for 5 minutes)',
    text: `
Hi there 👋,

You're trying to verify your account on the Smart E-Waste System.

Your one-time password (OTP) is:

🔐  ${otp}

Please enter this code within the next 5 minutes to complete your verification.

If you didn't request this, you can safely ignore this email.

Thanks,  
The Smart E-Waste Team
    `.trim(),
    replyTo: 'support@smartewaste.com',
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOtp;
