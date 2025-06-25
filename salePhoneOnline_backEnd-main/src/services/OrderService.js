
const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const createOrder = (newOrder) => {
  return new Promise(async (resolve, reject) => {
      const { orderItems, paymentMethod, itemsPrice, shippingPrice, fullName, address, city, phone, totalPrice, user, discountCode, discountPercentage, isPaid, paidAt } = newOrder;
      
      try {
          // Kiểm tra và cập nhật số lượng cho từng sản phẩm trong orderItems
          const updateResults = await Promise.all(orderItems.map(async (order) => {
              const productData = await Product.findOneAndUpdate(
                  {
                      _id: order.product,
                      countInStock: { $gte: order.amount }
                  },
                  {
                      $inc: {
                          countInStock: -order.amount,
                          selled: +order.amount
                      }
                  },
                  { new: true }
              );

              if (!productData) {
                // Nếu một sản phẩm không đủ hàng, trả về id và tên của sản phẩm
                const outOfStockProduct = await Product.findById(order.product).select('name');
                return { status: 'ERR', id: order.product, name: outOfStockProduct?.name || 'Unknown' };
            }

              return { status: 'OK' };
          }));

          // Lọc ra các sản phẩm không đủ hàng
          const insufficientStock = updateResults.filter(result => result.status === 'ERR');
          if (insufficientStock.length > 0) {
              return resolve({
                  status: 'ERR',
                  message: `Sản phẩm không đủ hàng: ${insufficientStock.map(item => item.name).join(', ')}`
              });
          }

          // Chỉ tạo một bản ghi đơn hàng duy nhất sau khi kiểm tra kho hoàn tất
          const createdOrder = await Order.create({
              orderItems,
              shippingAddress: {
                  fullName,
                  address,
                  city,
                  phone
              },
              paymentMethod,
              itemsPrice,
              shippingPrice,
              discountCode,
              discountPercentage,
              totalPrice,
              user,
              isPaid,
              paidAt
          });

          if (createdOrder) {
              resolve({
                  status: 'OK',
                  message: 'SUCCESS',
                  data: createdOrder
              });
          }

      } catch (e) {
          console.log('Error:', e);
          reject(e);
      }
  });
};



const getOrderDetails  = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                _id: id
            })
           if(order === null) {
                resolve({
                    status: "OK",
                    message: "The order is not defined"
                })
           }
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: order
                })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllOrder = () => {
    return new Promise( async (resolve, reject) => {
        try {
          const allOrder = await Order.find().sort({ createdAt: -1 });
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allOrder
                })
        } catch (e) {
            reject(e)
        }
    })
}


const updateStatusOrder = (id,data) => {
    return new Promise( async (resolve, reject) => {
        try {
            const checkOrder = await Order.findOne({
                _id: id
            })
           if(checkOrder == null) {
                resolve({
                    status: "OK",
                    message: "The product is not defined"
                })
           }
           const updateOrder = await Order.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updateOrder
                })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllOrdersByUser = (userId) => {
  return new Promise(async (resolve, reject) => {
      try {
          // Sắp xếp đơn hàng theo 'createdAt', từ mới nhất đến cũ nhất (desc)
          const orders = await Order.find({ user: userId })
            .populate('orderItems.product')
            .sort({ createdAt: -1 });  // Sắp xếp theo ngày giảm dần (mới nhất trước)

          if (orders.length === 0) {
              resolve({
                  status: "OK",
                  message: "No orders found for this user"
              });
          } else {
              resolve({
                  status: "OK",
                  message: "SUCCESS",
                  data: orders
              });
          }
      } catch (e) {
          reject(e);
      }
  });
}


// OrderService.js
const cancelOrder = (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        return resolve({
          status: "ERR",
          message: "Không thể hủy đơn hàng",
        });
      }
      // Kiểm tra nếu đơn hàng không thể hủy
      if (order.orderStatus === "Delivered" || order.orderStatus === "Cancelled" || order.orderStatus === "Shipped") {
        return resolve({
          status: "ERR",
          message: "Không thể hủy đơn hàng",
        });
      }
      
      // Hoàn kho cho các sản phẩm trong đơn hàng
      await Promise.all(
        order.orderItems.map(async (item) => {
          await Product.findByIdAndUpdate(item.product, {
            $inc: { countInStock: item.amount, selled: -item.amount },
          });
        })
      );

      // Cập nhật trạng thái đơn hàng thành "Cancelled"
      order.orderStatus = "Cancelled";
      await order.save();

      resolve({
        status: "OK",
        message: "Hủy đơn hàng thành công",
        data: order,
      });
    } catch (error) {
      reject(error);
    }
  });
};



//tính tổng doanh thu
const calculateTotalRevenue = async () => {
    try {
      const orders = await Order.aggregate([
        { $match: { isPaid: true } }, // Chỉ lấy đơn hàng đã thanh toán
        {
          $group: {
            _id: null, // Không nhóm theo trường nào (tính tổng cho toàn bộ)
            totalRevenue: { $sum: "$totalPrice" } // Tính tổng trường totalPrice
          }
        }
      ]);
  
      return orders[0]?.totalRevenue || 0; // Trả về tổng doanh thu, nếu không có, trả về 0
    } catch (error) {
      throw new Error("Error calculating total revenue"); // Ném lỗi nếu có
    }
  };

  // Hàm xử lý tính doanh thu theo tháng
const calculateMonthlyRevenue = async (year) => {
    try {
      const orders = await Order.aggregate([
        { 
          $match: { 
            isPaid: true, 
            createdAt: {
              $gte: new Date(`${year}-01-01`),  // Tính từ đầu năm
              $lt: new Date(`${year + 1}-01-01`) // Đến hết năm
            }
          }
        },
        {
          $group: {
            _id: { month: { $month: "$createdAt" } }, // Nhóm theo tháng
            monthlyRevenue: { $sum: "$totalPrice" } // Tính tổng doanh thu trong mỗi tháng
          }
        },
        { $sort: { "_id.month": 1 } } // Sắp xếp kết quả theo tháng
      ]);
  
      return orders; // Trả về doanh thu từng tháng
    } catch (error) {
      throw new Error("Error calculating monthly revenue");
    }
  };
  
  // Hàm xử lý tính doanh thu theo năm
  const calculateYearlyRevenue = async () => {
    try {
      const orders = await Order.aggregate([
        { $match: { isPaid: true } }, // Chỉ lấy đơn hàng đã thanh toán
        {
          $group: {
            _id: { year: { $year: "$createdAt" } }, // Nhóm theo năm
            yearlyRevenue: { $sum: "$totalPrice" } // Tính tổng doanh thu trong mỗi năm
          }
        },
        { $sort: { "_id.year": 1 } } // Sắp xếp kết quả theo năm
      ]);
  
      return orders; // Trả về doanh thu từng năm
    } catch (error) {
      throw new Error("Error calculating yearly revenue");
    }
  };

module.exports = {
    createOrder,
    getOrderDetails,
    getAllOrder,
    updateStatusOrder,
    calculateTotalRevenue,
    calculateMonthlyRevenue,
    calculateYearlyRevenue,
    getAllOrdersByUser,
    cancelOrder
}