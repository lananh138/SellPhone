const DiscountCodeService = require('../services/DiscountService');

// Thêm mã giảm giá
const createDiscountCode = async (req, res) => {
  try {
    const response = await DiscountCodeService.createDiscountCode(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

// Xem tất cả mã giảm giá
const getAllDiscountCodes = async (req, res) => {
  try {
    const response = await DiscountCodeService.getAllDiscountCodes();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

// Xem chi tiết mã giảm giá
const getDiscountCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await DiscountCodeService.getDiscountCode(code);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

// Sửa mã giảm giá
const updateDiscountCode = async (req, res) => {
  try {
    const { code } = req.params;
    const updates = req.body;
    const response = await DiscountCodeService.updateDiscountCode(code, updates);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

// Xóa mã giảm giá
const deleteDiscountCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await DiscountCodeService.deleteDiscountCode(code);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

// Sử dụng mã giảm giá
const useDiscountCode = async (req, res) => {
  try {
    const { code } = req.params;
    const response = await DiscountCodeService.useDiscountCode(code);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json(e);
  }
};

module.exports = {
  createDiscountCode,
  getAllDiscountCodes,
  getDiscountCode,
  updateDiscountCode,
  deleteDiscountCode,
  useDiscountCode
};
