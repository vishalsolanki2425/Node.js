const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db Connect"))
    .catch((err) => console.log(err));
};

module.exports = dbConnect();