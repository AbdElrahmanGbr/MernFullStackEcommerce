const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxLenght: [50, 'Product name must be less than 50 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        trim: true,
        maxLenght: [5, 'Product price must be less than 5 characters'],
        default: 0.00,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: [true, 'Product image is required'],
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, 'Product category is required'],
        enum: {
            values: ['Electronics', 'Cameras', 'Phones', 'Laptops', 'Accessories', 'Books', 'Clothing', 'Shoes', 'Toys', 'Sports', 'Automotive'],
            message: 'Please enter a valid category',
        },
    },
    seller: {
        type: String,
        required: [true, 'Product seller is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        maxLenght: [5, 'Product stock must be less than 5 characters'],
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: [true, 'Review name is required'],
            },
            rating: {
                type: Number,
                required: [true, 'Review rating is required'],
            },
            comment: {
                type: String,
                required: [true, 'Review comment is required'],
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Product', productSchema);
