const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService")
const { JsonWebTokenError } = require("jsonwebtoken")
const Order = require("../models/OrderProduct")

const createUser = (newUser) => {
    return new Promise( async (resolve, reject) => {
        const {name, email, password} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
           if(checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "Email đã tồn tại!"
                })
           }
           const hash = bcrypt.hashSync(password, 10)
            const createUser =await User.create({ //createdUser
                name,
                email, 
                password: hash
            })
            if(createUser){
                resolve({
                    status: "OK",
                    message: "Đăng ký thành công!",
                    data: createUser
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getUserByEmail = async (email) => {
    try {
        return await User.findOne({ email: email });
    } catch (e) {
        throw e;
    }
};

const loginUser = (userLogin) => {
    return new Promise( async (resolve, reject) => {
        const {email, password} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
           if(checkUser == null) {
                resolve({
                    status: "ERR",
                    message: "Không tìm thấy người dùng!"
                })
           }
           const comparePassword = bcrypt.compareSync(password,checkUser.password)
            if(!comparePassword){
                resolve({
                    status: "ERR",
                    message: "Email hoặc Mật khẩu sai!"
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: "OK",
                message: "Đăng nhập thành công",
                access_token,
                refresh_token
                })
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra các điều kiện của từng trường dữ liệu
            if (data.name && data.name.length > 25) {
                return resolve({ status: "ERR", message: "Tên không được vượt quá 25 ký tự." });
            }

            if (data.email && !data.email.endsWith("@gmail.com")) {
                return resolve({ status: "ERR", message: "Email phải có đuôi @gmail.com." });
            }

            if (data.isAdmin !== undefined) {
                // Ép kiểu nếu là chuỗi "true" hoặc "false"
                const isAdmin = (data.isAdmin === "true") || (data.isAdmin === "false") ? data.isAdmin === "true" : data.isAdmin;
                
                if (typeof isAdmin !== "boolean") {
                    return resolve({ status: "ERR", message: "isAdmin phải là true hoặc false." });
                }
            }

            if (data.phone) {
                const phoneStr = data.phone.toString();
                if (!/^\d+$/.test(phoneStr)) {
                    return resolve({ status: "ERR", message: "Số điện thoại phải là số." });
                }
                if (phoneStr.length > 20 || phoneStr.length < 7) {
                    return resolve({ status: "ERR", message: "Số điện thoại phải có từ 7 đến 20 số." });
                }
            }

            if (data.address && data.address.length > 100) {
                return resolve({ status: "ERR", message: "Địa chỉ quá dài." });
            }

            if (data.city && data.city.length > 100) {
                return resolve({ status: "ERR", message: "Tên thành phố quá dài." });
            }

            if (data.role && data.role.length > 20) {
                return resolve({ status: "ERR", message: "Vai trò quá dài." });
            }

            // Kiểm tra người dùng có tồn tại hay không
            const checkUser = await User.findOne({ _id: id });
            if (checkUser == null) {
                return resolve({
                    status: "ERR",
                    message: "Người dùng không tồn tại",
                });
            }

            // Cập nhật thông tin người dùng
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: "OK",
                message: "Cập nhật thành công",
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (checkUser == null) {
                resolve({
                    status: "OK",
                    message: "Không tìm thấy người dùng!",
                });
            }

            // Xóa tất cả các đơn hàng của người dùng trước khi xóa người dùng
            await Order.deleteMany({ user: id });

            // Xóa người dùng
            await User.findByIdAndDelete(id);

            resolve({
                status: "OK",
                message: "Xóa người dùng thành công",
            });
        } catch (e) {
            reject(e);
        }
    });
};


const getAllUser = () => {
    return new Promise( async (resolve, reject) => {
        try {
           const allUser= await User.find()
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allUser
                })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
           if(user == null) {
                resolve({
                    status: "OK",
                    message: "Không tìm thấy người dùng!"
                })
           }
           
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: user
                })
        } catch (e) {
            reject(e)
        }
    })
}
//Google
const findOrCreateUser = async ({ email, name, picture }) => {
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        let user = await User.findOne({ email });

        // Nếu người dùng chưa tồn tại, tạo mới
        if (!user) {
            user = await User.create({
                name,
                email,
                password: bcrypt.hashSync(Date.now().toString(), 10), // Tạo password giả
                avatar: picture,
                isAdmin: false, // Có thể thay đổi theo yêu cầu
            });
        }

        // Tạo access_token với _id của người dùng
        const access_token = genneralAccessToken({
            id: user._id, // Sử dụng _id của người dùng
            isAdmin: user.isAdmin
        });
        const refresh_token = await genneralRefreshToken({
            id: user._id,
            isAdmin: user.isAdmin
        })

        // Nếu người dùng đã tồn tại, chỉ trả về thông tin người dùng cùng với access_token
        return {
            status: "OK",
            message: "Đăng nhập thành công!",
            data: {
                user,
                access_token, // Trả về access_token
                refresh_token
            },
        };
    } catch (error) {
        throw new Error("Error creating or finding user: " + error.message);
    }
};



module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    findOrCreateUser,
    getUserByEmail
}