const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dbsgkr0203@gmail.com',
    pass: process.env.GOOGLE_NODE_MAIL,
  },
});

module.exports = (to, subject, text) =>
  new Promise((rsolve, reject) => {
    const message = {
      from: 'dbsgkr0203@gmail.com',
      to,
      subject,
      text,
    };

    transport.sendMail(message, (err, info) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(info);
    });
  });
