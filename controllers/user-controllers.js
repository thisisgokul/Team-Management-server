const User = require("../models/userModel");
const customError = require("../utils/errorHandler");

const getAllUsers = async (req, res, next) => {
    try {
      const usersData = await User.find().sort({createdAt:-1});
      res.status(200).json(usersData);
    } catch (error) {
      next(customError(error));
    } 
  }

  const getSingleUser = async (req, res, next) => {
    try {
      const { id } = req.params; 
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const userData = await User.findById(id);
  
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(userData);
    } catch (error) {
      next(customError(error));
    }
  };

  const updateTeamMember = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fullName, email, role } = req.body;
  
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      if (!fullName || !email || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
  
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { fullName, email, role },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "Team member updated successfully!",
        data: updatedUser,
      });
    } catch (error) {
      next(customError(error)); 
    }
  };
  
  const deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      // Find and delete the user by their ID
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Send success response
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      // Handle errors with custom error handler
      next(customError(error));
    }
  };
  
  module.exports = {getAllUsers,getSingleUser,updateTeamMember,deleteUser}