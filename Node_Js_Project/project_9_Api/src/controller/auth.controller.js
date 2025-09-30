const User = require("../models/usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SendEmail = require("../middleware/SendEmail");

exports.registerUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (user) {
            return res.json({ status: 400, message: "User is Already Exist" })
        }

        let hashPassword = await bcrypt.hash(req.body.password, 10)

        let imagePath = ""
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`
        }

        user = await User.create({
            ...req.body,
            password: hashPassword,
            profileImage: imagePath,
        })

        let mailMessage = {
            from: 'vishalsolanki4880@gmail.com',
            to: `${req.body.email}`,
            // solankivishal15122005@gmail.com
            subject: "Credentials For Login",
            html: `
                <div style="font-family:Inter, Arial, Helvetica, sans-serif; background:#f3f6fb; padding:28px; border-radius:12px; max-width:680px; margin:18px auto; color:#374151; border:1px solid #e6eef8;">
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:640px; margin:auto;">
                        <tr>
                        <td style="text-align:center; padding-bottom:12px;">
                            <h1 style="margin:0; color:#0f172a; font-size:22px; letter-spacing:0.2px;">Admin Panel — Account Details</h1>
                            <p style="margin:6px 0 0; font-size:13px; color:#6b7280;">Here are the credentials you requested</p>
                        </td>
                        </tr>

                        <tr>
                        <td style="padding:18px 12px 0;">
                            <div style="background:#ffffff; border-radius:10px; padding:18px; box-shadow:0 2px 6px rgba(10,20,40,0.04); border:1px solid #e8f0fb;">
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                <td style="padding:8px 0; font-size:13px; color:#374151;">
                                    <strong style="display:block; font-size:12px; color:#111827; margin-bottom:6px;">Email</strong>
                                    <div style="padding:12px; background:#f8fafc; border-radius:8px; border:1px solid #eef3fb; font-size:15px; word-break:break-all;">
                                    ${req.body.email}
                                    </div>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding:12px 0 0; font-size:13px; color:#374151;">
                                    <strong style="display:block; font-size:12px; color:#111827; margin-bottom:6px;">Password</strong>
                                    <div style="padding:12px; background:#fff7ed; border-radius:8px; border:1px solid #ffecd1; font-size:15px; letter-spacing:1px;">
                                    ${req.body.password}
                                    </div>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding-top:14px;">
                                    <div style="display:flex; gap:8px; align-items:center; justify-content:flex-start; flex-wrap:wrap;">
                                    <div style="padding:8px 14px; background:#e8f3ff; border-radius:8px; font-size:13px; color:#0f172a; border:1px solid #dbeefc;">
                                        <strong>Note:</strong> This password is shown once for your reference.
                                    </div>
                                    <div style="padding:8px 14px; background:#fff0f6; border-radius:8px; font-size:13px; color:#7f1d1d; border:1px solid #ffe6ef;">
                                        ⚠️ Do not share this with anyone.
                                    </div>
                                    </div>
                                </td>
                                </tr>

                                <tr>
                                <td style="padding-top:18px; font-size:13px; color:#6b7280;">
                                    <p style="margin:0;">If you didn't request this, please contact admin support immediately.</p>
                                </td>
                                </tr>
                            </table>
                            </div>
                        </td>
                        </tr>

                        <tr>
                        <td style="padding-top:18px; text-align:center; font-size:12px; color:#9ca3af;">
                            <p style="margin:0;">Team Admin Panel • <a href="#" style="color:#2563eb; text-decoration:none;">support</a></p>
                        </td>
                        </tr>
                    </table>
                </div>
            `
        };

        SendEmail(mailMessage);
        return res.json({ status: 200, user, message: "User is Added Succesful" })

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, isDelete: false });
        if (!user) {
            return res.json({ status: 404, message: 'User not found' });
        }

        let Password = await bcrypt.compare(req.body.password, user.password);
        if (!Password) {
            return res.json({ message: "Invalid Credential" });
        }

        let token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY);

        return res.json({ status: 200, message: 'Loging Success', token, user });

    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: 'Server Error' });
    }
};