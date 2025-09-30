const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");

exports.verifytoken = async (req, res, next) => {
    let authorization = req.headers.authorization;
    if (!authorization) {
        return res.json({ stutes: 404, message: "authorization is failed" });
    }
    let token = authorization.split(" ")[1];
    if (!token) {
        return res.json({ stutes: 404, message: "Token invalid" });
    }
    let verifiedToken = jwt.verify(token, process.env.SECRET_KEY)
    let user = await User.findById(verifiedToken.userId)
    if (!user) {
        return res.json({ stutes: 401, message: "User Not Found" });
    }
    req.user = user;
    next();
};

exports.Roleverify = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.user.role)) {
            next();
        } else {
            return res.json({ message: "Invalid Role" });
        }
    }
};