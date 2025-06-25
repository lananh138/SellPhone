const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingAddress: {
            fullName: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            phone: { type: Number, required: true },
        },
        paymentMethod: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        discountCode: { type: String },
        discountPercentage: { type: Number },
        totalPrice: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        delivereAt: { type: Date },
        orderStatus: {
            type: String,
            default: 'Processing',
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            required: true,
        },
    },
    {
        timestamps: true, // Tự động tạo trường createdAt và updatedAt
    }
);

// Thêm chỉ mục sắp xếp theo ngày
orderSchema.index({ createdAt: -1 }); // Sắp xếp giảm dần theo createdAt

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
