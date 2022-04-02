
const Product= require('../models/Product')
const ApiFeatures = require('../utils/apiFeatures');
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
    const resPerPage =4;
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

