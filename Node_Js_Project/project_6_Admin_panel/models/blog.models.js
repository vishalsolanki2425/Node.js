const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    authname: {
        type: String
    },
    authorid: {
        type: String
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    blogimage: {        
        type: String
    },
});

module.exports = mongoose.model("blog", blogSchema)