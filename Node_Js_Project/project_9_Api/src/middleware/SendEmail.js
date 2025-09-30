const nodemailer = require("nodemailer")

const SendEmail = async (data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "vishalsolanki4880@gmail.com",
            pass: "veicsyeembhyfsqh",
        },
    });

    let res = await transporter.sendMail(data);
    if (res) {
        console.log("Email Response: ", res);
        return res;
    } else {
        console.log("Email is not Send");
    }
};

module.exports = SendEmail;