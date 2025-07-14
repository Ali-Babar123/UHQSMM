// routes/order.js
const express = require('express');
const router = express.Router();
const { order, getOrders, updateOrder, deleteOrder, getSingleOrder, getAllOrders, updateOrderStatus} = require('../../controllers/vendor/order');
const {authMiddleware} = require('../../controllers/auth/auth-controller');
const {adminMiddleware} = require('../../middleware/admin');


// POST /api/order/new
router.post('/newOrder', authMiddleware, order);
router.get('/getOrders/:userId', adminMiddleware, getOrders);
router.put('/updateOrder/:id', adminMiddleware, updateOrder);
router.delete('/deleteOrder/:id', adminMiddleware, deleteOrder);
router.get('/getSingleOrder/:id', adminMiddleware, getSingleOrder);
router.get('/getAllOrders', authMiddleware, getAllOrders);
router.put('/updateOrderStatus/:id', authMiddleware, updateOrderStatus)


module.exports = router;
