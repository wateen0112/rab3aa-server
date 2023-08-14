const nodemailer = require('nodemailer');

// Replace these values with your actual email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: 'semicolon111112@gmail.com',
    pass: 'tsvyujqouzuwcdxi',
  },
};

const transporter = nodemailer.createTransport(emailConfig);

function sendEmail(to, subject, text) {
  const mailOptions = {
    from: emailConfig.auth.user,
    to:to,
    subject:subject,
    html:text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

module.exports = {
  sendEmail,
};
