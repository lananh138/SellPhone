const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        image: {type: [String]},
        type: {type: String, required: true},
        price: {type: Number, required: true},
        countInStock: {type: Number, required: true},
        rating: {type: Number},
        description: {type: String},
        selled: {type: Number },
        
        screenSize: { type: String }, // Kích thước màn hình
        chipset: { type: String }, // Chipset
        ram: { type: String }, // Dung lượng RAM
        storage: { type: String }, // Bộ nhớ trong
        battery: { type: String }, // Pin
        screenResolution: { type: String }, // Độ phân giải màn hình
    },
    {
        timestamps: true,
    }
);
productSchema.index({ name: 1 }); // Tạo chỉ mục cho trường 'name' để tối ưu hóa tìm kiếm
productSchema.index({ createdAt: -1 }); // Tạo chỉ mục cho trường 'createdAt' để tối ưu hóa sắp xếp
const Product = mongoose.model('Product', productSchema);

module.exports = Product;