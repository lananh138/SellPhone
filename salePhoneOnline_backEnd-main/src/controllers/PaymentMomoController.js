// controllers/PaymentMomoController.js
const axios = require('axios');
const crypto = require('crypto');

const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';

const createPaymentMomo = async (req, res) => {
    const {amountReq, orderInfoReq } = req.body
    try {
        // Tham số thanh toán
        const orderInfo = orderInfoReq;
        const partnerCode = 'MOMO';
        const redirectUrl = 'http://localhost:5085/payment';
        const ipnUrl = 'https://1b9e-113-23-35-209.ngrok-free.app/callback';
        const requestType = "payWithMethod";
        const amount = amountReq;
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = '';
        const orderGroupId = '';
        const autoCapture = true;
        const lang = 'vi';

        // Tạo chữ ký
        const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        // Tạo đối tượng yêu cầu
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature
        });

        // Tùy chọn cho yêu cầu Axios
        const options = {
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/create",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            },
            data: requestBody
        };
        console.log("requestBody",requestBody)

        // Gọi API MoMo
        const result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error in createPaymentMomo:', error);
        return res.status(500).json({
            statusCode: 500,
            message: "Error processing Momo payment",
            error: error.message || 'Server error'
        });
    }
};

const handleCallback = async (req, res) => {
    console.log("callback:: ");
    console.log(req.body);
    return res.status(200).json(req.body);
};

const checkTransactionStatus = async (req, res) => {
    try {
        const { orderId } = req.body;
        const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
        const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: "MOMO",
            requestId: orderId,
            orderId: orderId,
            signature: signature,
            lang: 'vi'
        });

        // Tùy chọn cho yêu cầu Axios
        const options = {
            method: "POST",
            url: 'https://test-payment.momo.vn/v2/gateway/api/query',
            headers: {
                'Content-Type': 'application/json'
            },
            data: requestBody
        };

        // Gọi API kiểm tra trạng thái giao dịch
        const result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        console.error('Error in checkTransactionStatus:', error);
        return res.status(500).json({
            statusCode: 500,
            message: "Error checking transaction status",
            error: error.message || 'Server error'
        });
    }
};

module.exports = {
    createPaymentMomo,
    handleCallback,
    checkTransactionStatus
};
