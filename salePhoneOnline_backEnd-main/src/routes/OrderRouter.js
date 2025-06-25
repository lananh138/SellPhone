const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController')
const {authUserMiddleware, authMiddleware} = require("../middleware/authMiddleware")

router.post('/create', OrderController.createOrder)

router.get('/get-order-details/:id', OrderController.getDetailOrder)

router.get('/get-all-order',authMiddleware, OrderController.getAllOrder)

router.put('/update/:id',authMiddleware, OrderController.updateOrder)

router.get('/user/:id', OrderController.getAllOrderByUser);

router.put("/cancel/:id",authUserMiddleware, OrderController.cancelOrder);

router.get('/total-revenue', authMiddleware,OrderController.totalRevenue)

router.get('/monthly-revenue/:year',authMiddleware, OrderController.monthlyRevenue); // Tính doanh thu theo tháng

router.get('/yearly-revenue',authMiddleware, OrderController.yearlyRevenue); // Tính doanh thu theo năm

module.exports = router