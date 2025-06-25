const Order = require('../models/OrderProduct')
const { calculateTotalRevenue } = require('../services/OrderService')
const Orderservice = require('../services/OrderService')

const createOrder = async (req, res) => {
    try {
        const {paymentMethod, itemsPrice, shippingPrice,totalPrice,fullName,address,city,phone} = req.body
        if(!paymentMethod||!itemsPrice||!shippingPrice||!totalPrice||!fullName||!address||!city||!phone){
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await Orderservice.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if(!orderId){
            return res.status(200).json({
                status: "ERR",
                message: "The orderId is required"
            })
        }
        const response = await Orderservice.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllOrder = async (req, res) => {
    try {
        const data = await Orderservice.getAllOrder()
        return res.status(200).json(data)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        const data = req.body
        if(!orderId){
            return res.status(200).json({
                status: "ERR",
                message: "The orderId is required"
            })
        }
        const response = await Orderservice.updateStatusOrder(orderId,data)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrderByUser = async (req, res) => {
    try {
        const userId = req.params.id; // Lấy userId từ params
        if (!userId) {
            return res.status(400).json({
                status: "ERR",
                message: "The userId is required"
            });
        }
        const response = await Orderservice.getAllOrdersByUser(userId); // Gọi service
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
}
// OrderController.js
const cancelOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      if (!orderId) {
        return res.status(400).json({
          status: "ERR",
          message: "Order ID is required",
        });
      }
  
      const response = await Orderservice.cancelOrder(orderId);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({
        message: e.message,
      });
    }
  };
  

  // Tổng doanh thu
const totalRevenue = async (req, res) => {
    try {
      const totalRevenue = await Orderservice.calculateTotalRevenue(); // Gọi service để tính tổng doanh thu
      res.json({ totalRevenue }); // Trả về kết quả cho client
    } catch (error) {
      res.status(500).json({ message: error.message }); // Bắt lỗi và trả về message lỗi
    }
  };

  //doanh thu theo tháng
const monthlyRevenue = async (req, res) => {
    const { year } = req.params; // Nhận tham số year từ request
    try {
      const revenue = await Orderservice.calculateMonthlyRevenue(parseInt(year));
      res.json(revenue);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // doanh thu theo năm
  const yearlyRevenue = async (req, res) => {
    try {
      const revenue = await Orderservice.calculateYearlyRevenue();
      res.json(revenue);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = {
    createOrder,
    getDetailOrder,
    getAllOrder,
    updateOrder,
    totalRevenue,
    yearlyRevenue,
    monthlyRevenue,
    getAllOrderByUser,
    cancelOrder
}