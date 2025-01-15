const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png" // Default image if none provided
    },
   
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, { timestamps: true, collection: "productsData" });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
