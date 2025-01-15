const Order = require("../models/OrderModel");
const customError = require("../utils/errorHandler");


// POST request to create an order
const createOrder = async (req, res, next) => { 
    const {
        customerName,
        orderStatus,
        productId,  
        productName,
        productPrice,
        employeeId,
        productImage,
        productDescription,
        employeeName,
        employeeEmail
    } = req.body;


    try {
        // Ensure that all required fields are provided
        if (!customerName || !productId || !productName || !productPrice || !productImage || !productDescription) {
            return next(customError(400, "All fields are required"));
        }

        // Create a new order
        const newOrder = await Order.create({
            customerName,
            orderStatus,
            productId,
            productName,
            productPrice,
            productImage,
            productDescription,
            employeeName,
            employeeId,
            employeeEmail,
        });

        res.json({ message: "Order created successfully", order: newOrder });
    } catch (error) {
        console.error("Error in createOrder:", error);
        next(customError(500, "Something went wrong"));
    }
};

const getAllOrders = async (req, res, next) => {
    try {
      const orderData = await Order.find().sort({createdAt:-1});
     
      res.status(200).json(orderData);
    } catch (error) {  
      next(customError(error));
    } 
  }

const getAllSpecificProducts = async (req, res, next) => {
    try {
       
        
      const { userId } = req.query; 
  
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Filter products by userId ('employeeId' stores user reference)
      const productData = await Order.find({ employeeId: userId }).sort({ createdAt: -1 });
 
 
      res.status(200).json(productData);
    } catch (error) {
      next(customError(error));
    }
  };

  const updateOrder = async (req, res, next) => {
    try {
      const { id } = req.params; // Get the order ID from request parameters
      const { orderStatus } = req.body; // Order status to update
 
      if (!id) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      if (!orderStatus) {
        return res.status(400).json({ message: "Order status is required" });
      }
  
      // Update the order status using the provided ID and data
      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { orderStatus },
        { new: true, runValidators: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json({
        message: "Order updated successfully!",
        data: updatedOrder,
      });
    } catch (error) {
      next(customError(error)); // Pass any errors to the error handler
    }
  };
  
  

module.exports={createOrder,getAllSpecificProducts,getAllOrders,updateOrder};
