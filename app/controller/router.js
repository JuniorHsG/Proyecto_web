const express = require('express');
const path = require('path');

const router = express.Router();

// Ruta para el home
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
});

// Ruta para el carrito de compras
router.get('/shopping_cart', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'shopping_cart.html'));
});

module.exports = router;
