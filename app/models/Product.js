const mongoose = require('mongoose');
const { Schema } = mongoose;
const { generateUUID } = require('../controller/util');

const productSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true,
        default: () => generateUUID()
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    categorie: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;