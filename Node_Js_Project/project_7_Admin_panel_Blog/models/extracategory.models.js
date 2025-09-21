const mongoose = require("mongoose");

const extraCategorySchema = mongoose.Schema({
    categoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    subcategoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
    },
    extracategoryname: {
        type: String,
    },
});

module.exports = mongoose.model("ExtraCategory", extraCategorySchema);