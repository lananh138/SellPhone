const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const {name, image, type, price, countInStock,description} = req.body
        if(!name|| !image|| !type|| !price|| !countInStock||!description) {
            return res.status(200).json({
                status: "ERR",
                message: "Vui lòng điền đầy đủ các trường"
            })
        }

        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if(!productId){
            return res.status(200).json({
                status: "ERR",
                message: "Không tìm thấy id sản phẩm"
            })
        }
        const response = await ProductService.updateProduct(productId,data)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const ProductId = req.params.id
        if(!ProductId){
            return res.status(200).json({
                status: "ERR",
                message: "Không tìm thấy id sản phẩm"
            })
        }
        const response = await ProductService.getDetailProduct(ProductId)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if(!productId){
            return res.status(200).json({
                status: "ERR",
                message: "Không tìm thấy id sản phẩm"
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const {limit, page, sort,filter} = req.query
        const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page)|| 0 , sort,filter)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getProductsByPriceRange = async (req, res) => {
    try {
        // Lấy thông tin minPrice và maxPrice từ query
        const { minPrice, maxPrice } = req.query;

        // Kiểm tra xem minPrice và maxPrice có hợp lệ không
        if (!minPrice || !maxPrice) {
            return res.status(400).json({
                status: "ERROR",
                message: "Invalid price range. Please provide both minPrice and maxPrice."
            });
        }

        // Gọi service để lấy dữ liệu
        const response = await ProductService.getProductsByPriceRange(
            Number(minPrice),
            Number(maxPrice)
        );

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            message: error.message
        });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body
        if(!ids){
            return res.status(200).json({
                status: "ERR",
                message: "The ids is required"
            })
        }
        const response = await ProductService.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch(e) {
        return res.status(404).json({
            message: e
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType,
    getProductsByPriceRange
}
