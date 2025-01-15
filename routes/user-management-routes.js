const express=require("express");
const router=express.Router();
const {getAllUsers,getSingleUser,updateTeamMember,deleteUser} = require("../controllers/user-controllers");
const verifyToken = require("../utils/verifyToken");


router.get('/get-all-users',verifyToken,getAllUsers);
router.get('/get-user/:id',verifyToken,getSingleUser);
router.put('/update-team-member/:id',verifyToken,updateTeamMember);
router.delete('/delete-user/:id',verifyToken,deleteUser);

module.exports = router