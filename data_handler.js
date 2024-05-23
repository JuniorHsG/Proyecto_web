const fs = require('fs');
let products = [];
// Función para cargar y parsear el archivo products.json
const loadProducts = () => {
    try {
        const productsData = fs.readFileSync('./app/data/products.json', 'utf8');
        return JSON.parse(productsData);
  
    } catch (err) {
        console.error('Error al cargar los productos:', err);
        return [];
    }
};

const filterProducts = (products, queryParams) => {
    let filteredProducts = [...products];

   
    if (queryParams.title) {
        const titleRegex = new RegExp(queryParams.title, 'i'); // 'i' para que sea insensible a mayúsculas/minúsculas
        filteredProducts = filteredProducts.filter(product => titleRegex.test(product.title));
    }
    if (queryParams.genero) {
        filteredProducts = filteredProducts.filter(product => product.genero === queryParams.genero);
    }
    // Puedes agregar más lógica de filtrado aquí según tus necesidades

    return filteredProducts;
};

function getProductById(products, productId) {
    return products.find(product => product.uid === productId);
}

const saveProduct = (newProduct) => {
    try {
        console.log()
        // Cargar los productos actuales
        const currentProducts = loadProducts();

        // Agregar el nuevo producto al arreglo de productos
        currentProducts.push(newProduct);

        // Guardar los productos actualizados en el archivo
        fs.writeFileSync('./app/data/products.json', JSON.stringify(currentProducts, null, 4), 'utf8');
        console.log('Producto guardado exitosamente.');
    } catch (err) {
        console.error('Error al guardar el producto:', err);
    }
};

const addProduct = (newProduct) => {
    products.push(newProduct); 
};
const getProductIndexById = (productId) => {
    const products = loadProducts();
    for (let i = 0; i < products.length; i++) {

        if (products[i].uid === productId) {
            return i; // Devolver el índice si se encuentra el producto
        }
    }
    return -1; // Devolver -1 si el producto no se encuentra
};
const saveProducts = (updatedProduct,uid) => {
    try {
        // Cargar los productos actuales
        const currentProducts = loadProducts();

        // Encontrar el índice del producto a modificar
        const productIndex = currentProducts.findIndex(product => product.uid === uid);

        // Verificar si se encontró el producto
        if (productIndex === -1) {
            console.error('El producto no existe.');
            return;
        }

        // Actualizar el producto en su posición correspondiente
        currentProducts[productIndex] = updatedProduct;

        // Guardar los productos actualizados en el archivo
        fs.writeFileSync('./app/data/products.json', JSON.stringify(currentProducts, null, 4), 'utf8');
        console.log('Producto actualizado exitosamente.');
    } catch (err) {
        console.error('Error al guardar el producto:', err);
    }

};
function updateProduct(uuid, updatedProductData) {
    const index = products.findIndex(product => product.uid === uuid); 

        if (index !== -1) {
            const productToUpdate = products[index];
        if (updatedProductData.title) {
            productToUpdate.title = updatedProductData.title;
        }
        if (updatedProductData.description) {
            productToUpdate.description = updatedProductData.description;
        }
        if (updatedProductData.imageUrl) {
            productToUpdate.imageUrl = updatedProductData.imageUrl;
        }
        if (updatedProductData.unit) {
            productToUpdate.unit = updatedProductData.unit;
        }
        if (updatedProductData.stock) {
            productToUpdate.stock = updatedProductData.stock;
        }
        if (updatedProductData.pricePerUnit) {
            productToUpdate.pricePerUnit = updatedProductData.pricePerUnit;
        }
        if (updatedProductData.genero) {
            productToUpdate.genero = updatedProductData.genero;
        }
        return productToUpdate;
    } else {
        return null; 
    }
}
function deleteProduct(uid) {
    const index = products.findIndex(product => product.uid === uid);
    const index1 = products.find(product => product.uid === uid);
    if (index !== -1) {
        products.splice(index, 1);

        return true;
    } else {
        return false; 
    }
}

const getProductNameById = (productId) => {
    const products = loadProducts();
    const product = products.find(product => product.uid === productId);
    return product ? product.title : null;
};

module.exports = {
    loadProducts,
    filterProducts,
    getProductById,
    saveProduct,
    addProduct,
    getProductIndexById,
    saveProducts,
    updateProduct,
    deleteProduct,
    getProductNameById
};
