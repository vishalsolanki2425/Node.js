const passport = require("passport");
const userSchema = require("../models/user.models");
const otpgenerator = require("otp-generator");
const sendEmail = require("../middleware/Sendemail");


exports.dashboard = async (req, res) => {
    try {
        // req.flash("success", "Login Success");
        return res.render("dashboard", { user: req.user });
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.getlogin = (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.render("login");
        } else {
            // req.flash("success", 'Login Success');
            return res.render("dashboard");
        }
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
};

exports.postlogin = async (req, res) => {
    try {
        req.flash("success", 'Login Success');
        return res.redirect("/dashboard");
    } catch (error) {
        console.log("error", error);
        res.redirect("/");
    }
};

exports.logOut = async (req, res) => {
    try {
        req.logOut((err) => {
            if (err) {
                console.log("error", err);
                return res.redirect("/dashboard");
            }
            return res.redirect("/");
        })
    } catch (error) {
        console.log("error", error);
        req.flash("error", "Server Error!!!");
        res.redirect("/dashboard");
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        return res.render("forgotPassword");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.sendEmail = async (req, res) => {
    try {
        let user = await userSchema.findOne({ email: req.body.email });
        if (!user) {
            console.log("User not found");
            req.flash("error", "User Not Found");
            return res.redirect("/");
        }

        let otp = otpgenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let mailMessage = {
            from: 'vishalsolanki4880@gmail.com',
            to: `${req.body.email}`,
            // solankivishal15122005@gmail.com
            subject: "Reset Password for Admin Panel",
            html: `
                <div style="max-width:600px; margin:auto; font-family:Arial, Helvetica, sans-serif; background:#f9fafb; padding:20px; border-radius:10px; border:1px solid #ddd;">
                    <h2 style="color:#2563eb; text-align:center;">Hello User</h2>
                    <p style="font-size:15px; color:#374151;">We received a request to reset your password for <strong>Admin Panel</strong>.</p>
                    <p style="font-size:15px; color:#374151; margin:16px 0;">Your One Time Password (OTP) is:</p>
                    
                    <div style="text-align:center; font-size:28px; font-weight:bold; letter-spacing:6px; color:#111827; padding:14px 20px; background:#fff; border:2px dashed #2563eb; border-radius:8px; margin-bottom:20px;">
                        ${otp}
                    </div>
                    
                    <p style="font-size:14px; color:#6b7280;">⚠️ This OTP is valid for <strong>5 minutes</strong>. Do not share this code with anyone.</p>
                    
                    <p style="margin-top:24px; font-size:14px; color:#374151;">Thank you,<br>Team Admin Panel</p>
                </div>
            `
        };

        sendEmail(mailMessage);
        res.cookie('otp', otp);
        res.cookie('email', user.email);
        return res.render('otp-page');
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.otppage = (req, res) => {
    try {
        res.render("otp-page");
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
}

exports.verifyOTP = async (req, res) => {
    try {
        let otp = req.cookies.otp;
        if (otp == req.body.otp) {
            res.clearCookie("otp");
            return res.render("newPassword");
        } else {
            console.log("OTP is Not Verified!!!!");
            return res.redirect("back");
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("/");
    }
};

exports.resetpassword = async (req, res) => {
    try {
        res.render("newPassword");
    } catch (error) {
        console.log("error", error);
        return res.redirect("back");
    }
}

exports.resetPassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        let user = await userSchema.findOne({ email: email });
        if (user) {
            if (req.body.cpassword == req.body.newpassword) {
                await userSchema.findByIdAndUpdate(
                    user._id,
                    { password: req.body.newpassword },
                    { new: true }
                );
                res.clearCookie("email");
                req.flash("success", "Password was Reset Success!!!!");
                return res.redirect("/");
            } else {
                console.log("Password is not matched");
                req.flash("error", "Password was Not Matched!!!");
                return res.redirect("back");
            }
        } else {
            req.flash("error", "User Not Found");
            return res.redirect("/");
        }
    } catch (error) {
        console.log("error", error);
        return res.redirect("back");
    }
};