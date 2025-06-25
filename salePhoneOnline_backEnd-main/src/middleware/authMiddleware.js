const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.token;

    // Kiểm tra xem header có tồn tại không và có đúng định dạng không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization header is missing or invalid',
            status: 'ERROR',
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err || !user?.isAdmin) {
            return res.status(403).json({
                message: 'Unauthorized: You do not have permission',
                status: 'ERROR',
            });
        }
        next();
    });
};

const authUserMiddleware = (req, res, next) => {
    const authHeader = req.headers.token;

    // Kiểm tra xem header có tồn tại không và có đúng định dạng không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization header is missing or invalid',
            status: 'ERROR',
        });
    }

    const token = authHeader.split(' ')[1];
    const userId = req.params.id;

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err || (!user?.isAdmin && user?.id !== userId)) {
            return res.status(403).json({
                message: 'Unauthorized: You do not have permission',
                status: 'ERROR',
            });
        }
        next();
    });
};

module.exports = {
    authMiddleware,
    authUserMiddleware,
};
