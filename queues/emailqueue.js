const Bull = require("bull");
const nodemailer = require("nodemailer");

const emailQueue = new Bull("email", {
  redis: "redis://localhost:6379",
});


emailQueue.process(emailProcess);

const sendNewEmail = (data) => {
  emailQueue.add(data, {
    attempts: 2,
  });
};

async function emailProcess(job) {
  sendEmail(job);
}

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(job) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(job.data);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = { sendNewEmail };
