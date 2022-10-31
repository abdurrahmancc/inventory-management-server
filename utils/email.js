const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

console.log(process.env.MAILGUN_API_KEY);
module.exports.sendMailWithMailGun = async (data) => {
  try {
    const result = await mg.messages.create("sandbox732bf14e3b2c451d8078d1e318771648.mailgun.org", {
      from: "Mailgun Sandbox <postmaster@sandbox732bf14e3b2c451d8078d1e318771648.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    });

    return result.id;
  } catch (error) {
    console.log(error);
  }
};

// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.
