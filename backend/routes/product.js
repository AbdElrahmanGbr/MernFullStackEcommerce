const express = require('express')
const router = express.Router();


const {
    getProducts,
    getAdminProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview

} = require('../controllers/productController')
const express= require('express')

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const {getProducts, newProduct,getSingleProduct} = require('../controllers/productControllers')

router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/products').get(getProducts)
router.route('/product/new').post(newProduct)
router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), newProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);


router.route('/review').put(isAuthenticatedUser, createProductReview)
router.route('/reviews').get(isAuthenticatedUser, getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)
module.exports = router;