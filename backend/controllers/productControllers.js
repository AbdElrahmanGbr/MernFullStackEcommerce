
const Product= require('../models/Product')
const ApiFeatures = require('../utils/apiFeatures');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewires/catchAsyncErrors');




// create new product

exports.newProduct = async(res,req,next)=>{
    

    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
       
        product
    })
}

// get all products /api/v1/products
exports.getProducts = async (req, res, next) => {
    //  return next(new ErrorHandler('my error', 400))
    
    const resPerPage = 4; // results per page
    const productsCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter()
    .pagination(resPerPage);
    const products = await apiFeatures.query;


    res.status(200).json({
        success: true,
        count: products.length,
        productsCount,
        resPerPage,
        products
    });    



};

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
