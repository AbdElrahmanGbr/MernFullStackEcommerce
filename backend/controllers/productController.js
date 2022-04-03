const Product = require("../models/product");

// get all  product => /api/v1/products

exports.getProducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    sucess: true,
    count: products.length,
    products,
  });
};
// create a new product => /api/v1/products/news

exports.newProduct = async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    sucess: true,
    product,
  });
};

// get a single product => /api/v1/products/:id
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  console.log(product);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  res.status(200).json({
    success: true,
    product,
  });
};
// Update a product => /api/v1/admin/products/:id
exports.updateProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
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
};

// Delete a product => /api/v1/admin/products/:id
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted",
  });
};
