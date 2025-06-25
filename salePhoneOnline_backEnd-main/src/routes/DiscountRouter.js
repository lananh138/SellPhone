const express = require('express');
const DiscountController = require('../controllers/DiscountController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', DiscountController.createDiscountCode);
router.get('/get-all', DiscountController.getAllDiscountCodes);
router.get('/get-detail/:code', DiscountController.getDiscountCode);
router.put('/update/:code',authMiddleware, DiscountController.updateDiscountCode);
router.delete('/delete/:code',authMiddleware, DiscountController.deleteDiscountCode);
router.post('/use/:code',authMiddleware, DiscountController.useDiscountCode);

module.exports = router;
