// routes/PaymentMomoRouter.js
const express = require('express');
const {
    createPaymentMomo,
    handleCallback,
    checkTransactionStatus
} = require('../controllers/PaymentMomoController');

const router = express.Router();

// Định nghĩa các route
router.post('/momo', createPaymentMomo);
router.post('/callback', handleCallback);
router.post('/transactionstatus', checkTransactionStatus);

module.exports = router;
