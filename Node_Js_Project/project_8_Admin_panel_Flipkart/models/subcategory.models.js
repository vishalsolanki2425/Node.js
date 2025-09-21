const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema({
    categoryname: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    subcategoryname: {
        type: String,
    },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);