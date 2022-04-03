const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');
// create new product
// Create a new product => /api/v1/admin/product/new
exports.newProduct = async (res, req, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

// get all products /api/v1/products
exports.getProducts = async (req, res, next) => {
    const resPerPage = 4;
    const productcount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        productcount,
        products
    });
};


// Get single product details   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        product
    })

})


// Update a product => /api/v1/admin/products/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        product,
    });
});
// Delete a product => /api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found',
        });
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product deleted',
    });
});