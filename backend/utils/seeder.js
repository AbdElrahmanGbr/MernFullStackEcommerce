const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/products');

// Setting up dotenv
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log('Products are deleted from database');
        await Product.insertMany(products);
        console.log('Products added to database');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit();
    }
}

seedProducts();