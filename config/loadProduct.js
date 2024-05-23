const Product = require('../app/models/Product');

const loadProducts = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (err) {
        console.error('Error al cargar los productos:', err);
        return [];
    }
};

module.exports = loadProducts;
