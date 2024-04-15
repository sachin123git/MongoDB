const nodemailer = require('nodemailer');
// Create transporter outside the route handler
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'erin.goldner98@ethereal.email',
        pass: 'zMvQX2xwxVPpnbe47U'
    }
});

const generateOTP=()=> {
    return Math.floor(Math.random() * 10000);
}

// Define the main function
async function main(OTP) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <erin.goldner98@ethereal.email>',
        to: "sachin.disolutions@gmail.com",
        subject: "Hello ✔",
        text: "i am sachin patil",
        html: `<b> OTP for the varification  is ${OTP}</b>`,
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {main , generateOTP}