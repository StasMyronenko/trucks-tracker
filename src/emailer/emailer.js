const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_LOGIN,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmailRestorePassword = async (email) => {
  const mailOptions = {
    from: 'mysitesatpython@gmail.com',
    to: email,
    subject: 'Restore password',
    html: `<a href="http://127.0.0.1:3000/restore_password/${email}">Create new password</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { sendEmailRestorePassword };
