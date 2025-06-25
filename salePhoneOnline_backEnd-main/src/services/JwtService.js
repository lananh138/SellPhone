const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const genneralAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '180s' })
    return access_token;
}

const genneralRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '360d' })

    return refresh_token;
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.REFRESH_TOKEN, (err, user) => {
            if (err) {
                return reject(err); // Trả về lỗi cụ thể nếu có lỗi trong quá trình xác thực token
            }
            
            const access_token = genneralAccessToken({
                id: user?.id,
                isAdmin: user?.isAdmin
            });
            
            resolve({
                status: "OK",
                message: "SUCCESS",
                access_token
            });
        });
    });
};


module.exports = {
    genneralAccessToken,
    genneralRefreshToken,
    refreshTokenJwtService
}
