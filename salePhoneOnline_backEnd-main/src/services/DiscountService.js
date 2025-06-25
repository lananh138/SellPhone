const DiscountCode = require('../models/DiscountCodeModel');
// Thêm mã giảm giá
const createDiscountCode = async (newDiscountCode) => {
  try {
    const { code } = newDiscountCode;

    // Kiểm tra độ dài của mã giảm giá
    if (code.length > 10) {
      return { status: "ERR", message: "Mã giảm giá không được quá 10 ký tự!" };
    }

    // Kiểm tra nếu mã chứa khoảng trắng hoặc dấu (chỉ cho phép chữ cái và số)
    const isValidCode = /^[a-zA-Z0-9]+$/.test(code);
    if (!isValidCode) {
      return { status: "ERR", message: "Mã giảm giá không được chứa dấu hoặc khoảng trắng!" };
    }

    // Kiểm tra nếu mã đã tồn tại
    const existingCode = await DiscountCode.findOne({ code });
    if (existingCode) {
      return { status: "ERR", message: "Mã giảm giá đã tồn tại!" };
    }

    const discountCode = await DiscountCode.create(newDiscountCode);
    return { status: "OK", message: "Tạo mã giảm giá thành công!", data: discountCode };
  } catch (e) {
    throw { status: "ERR", message: e.message };
  }
};



// Xem tất cả mã giảm giá
const getAllDiscountCodes = async () => {
  try {
    const discountCodes = await DiscountCode.find();
    return { status: "OK", message: "Lấy danh sách mã giảm giá thành công!", data: discountCodes };
  } catch (e) {
    throw { status: "ERR", message: e.message };
  }
};
// Xem chi tiết mã giảm giá
const getDiscountCode = async (code) => {
  try {
    const discountCode = await DiscountCode.findOne({ code });
    if (!discountCode) {
      return { status: "ERR", message: "Mã giảm giá không tồn tại!" };
    }
    // Kiểm tra số lần sử dụng
    if (discountCode.usedCount >= discountCode.maxUses) {
      return { status: "ERR", message: "Mã giảm giá đã hết số lần sử dụng!" };
    }
    return { status: "OK", message: "Lấy mã giảm giá thành công!", data: discountCode };
  } catch (e) {
    throw { status: "ERR", message: e.message };
  }
};
// Sửa mã giảm giá
const updateDiscountCode = async (code, updates) => {
  try {
    // Kiểm tra mã mới (nếu có) trước khi cập nhật
    if (updates.code) {
      // Kiểm tra độ dài của mã mới
      if (updates.code.length > 10) {
        return { status: "ERR", message: "Mã giảm giá không được quá 10 ký tự!" };
      }

      // Kiểm tra nếu mã chứa khoảng trắng hoặc dấu (chỉ cho phép chữ cái và số)
      const isValidCode = /^[a-zA-Z0-9]+$/.test(updates.code);
      if (!isValidCode) {
        return { status: "ERR", message: "Mã giảm giá không được chứa dấu hoặc khoảng trắng!" };
      }

      // Kiểm tra nếu mã mới đã tồn tại trong hệ thống
      const existingCode = await DiscountCode.findOne({ code: updates.code });
      if (existingCode) {
        return { status: "ERR", message: "Mã giảm giá đã tồn tại!" };
      }
    }

    // Tiến hành cập nhật mã giảm giá nếu các điều kiện trên được thỏa mãn
    const discountCode = await DiscountCode.findOneAndUpdate({ code }, updates, { new: true });
    if (!discountCode) {
      return { status: "ERR", message: "Mã giảm giá không tồn tại!" };
    }

    return { status: "OK", message: "Cập nhật mã giảm giá thành công!", data: discountCode };
  } catch (e) {
    throw { status: "ERR", message: e.message };
  }
};


// Xóa mã giảm giá
const deleteDiscountCode = async (code) => {
  try {
    const discountCode = await DiscountCode.findOneAndDelete({ code });
    if (!discountCode) {
      return { status: "ERR", message: "Mã giảm giá không tồn tại!" };
    }
    return { status: "OK", message: "Xóa mã giảm giá thành công!" };
  } catch (e) {
    throw { status: "ERR", message: e.message };
  }
};

// Sử dụng mã giảm giá
const useDiscountCode = async (code) => {
  try {
    const discountCode = await DiscountCode.findOne({ code });
    if (!discountCode) {
      return { status: "ERR", message: "Mã giảm giá không tồn tại!" };
    }
    if (discountCode.usedCount >= discountCode.maxUses) {
      return { status: "ERR", message: "Mã giảm giá đã hết số lần sử dụng!" };
    }
    discountCode.usedCount += 1;
    await discountCode.save();
    return { status: "OK", message: "Sử dụng mã giảm giá thành công!", data: discountCode };
  } catch (e) {
    throw { status: "ERR", message: e.message };
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
