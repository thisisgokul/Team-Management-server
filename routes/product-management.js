const express=require("express");
const router=express.Router();
const {createProduct,getAllProducts,getSingleProduct
,updateProduct,deleteProduct}= require("../controllers/product-controllers")
const {createOrder,getAllSpecificProducts,getAllOrders,updateOrder} = require("../controllers/order-controller");
const verifyToken = require("../utils/verifyToken");


router.post('/create-product',verifyToken,createProduct);
router.get('/get-all-product',verifyToken,getAllProducts);
router.get('/get-product/:id',verifyToken,getSingleProduct);
router.put('/update-product/:id',verifyToken,updateProduct);
router.delete('/delete-product/:id',verifyToken,deleteProduct);

// order management
router.post('/place-order',verifyToken,createOrder);
router.get('/get-all-orders',verifyToken,getAllOrders);
router.get('/get-specific-products',verifyToken,getAllSpecificProducts);
router.put('/update-order-status/:id',verifyToken,updateOrder);


module.exports = router 