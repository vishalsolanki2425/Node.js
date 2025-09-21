const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    categoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    subcategoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    },
    extracategoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ExtraCategory",
    },
    price: {
        type: Number
    },
    productimage: {
        type: String
    },
});

module.exports = mongoose.model("product", productSchema);