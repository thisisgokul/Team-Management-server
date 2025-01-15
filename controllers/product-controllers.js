const Product = require("../models/productModel");
const customError = require("../utils/errorHandler");

const createProduct = async (req, res, next) => {
    const { name, description, price, image } = req.body;

    try {
        
        // Create a new product
        const newProduct = await Product.create({
            name,
            description,
            price,
            image,
        });

        res.json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        console.error("Error in createProduct:", error); 
        next(customError(500, "Something went wrong"));
    }
};

const getAllProducts = async (req, res, next) => {
    try {
      const productData = await Product.find().sort({createdAt:-1});
      res.status(200).json(productData);
    } catch (error) {
      next(customError(error));
    } 
  }


const getSingleProduct = async (req, res, next) => {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }
  
      // Find the product by its ID
      const productData = await Product.findById(id);
  
      if (!productData) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json(productData); 
    } catch (error) {
      next(customError(error))
    }
  };


const updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params; // Get the product ID from request parameters
      const { name, description, price, image } = req.body; // Product details to update
    
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }
    
      if (!name || !description || !price || !image)  {
        return res.status(400).json({ message: "All fields are required" });
      }
    
      // Update the product using the provided ID and data
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { name, description, price, image },
        { new: true, runValidators: true }
      );
    
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
    
      res.status(200).json({
        message: "Product updated successfully!",
        data: updatedProduct,
      });
    } catch (error) {
      next(customError(error)); // Pass any errors to the error handler
    }
  };


  const deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "product ID is required" });
      }
  
      // Find and delete the user by their ID
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }
  
      // Send success response
      res.status(200).json({ message: "product deleted successfully" });
    } catch (error) {
      // Handle errors with custom error handler
      next(customError(error));
    }
  };

module.exports = { createProduct,getAllProducts ,getSingleProduct,updateProduct,deleteProduct};
