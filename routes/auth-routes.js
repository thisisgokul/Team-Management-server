const express=require("express");
const router=express.Router();
const {all,createMember, signin,signout}= require("../controllers/auth-controllers")

router.get('/',all);
router.get('/logout',signout);
router.post('/create-team-member',createMember);
router.post('/sign-in',signin);

module.exports = router