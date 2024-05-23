import Producto from './product.js';

const products = [];

function getProducts() {
    return products;
}

function getProductById(uuid) {

    return products.find(product => product.uid === uuid);
}

function createProduct(title, description, imageUrl, unit, categorie, price) {
    const newProduct = new Producto(title, description, imageUrl, unit, categorie, price);
    products.push(newProduct);
    var contenedor = document.getElementById("content_products");
var cardsHTML = "";
  cardsHTML += `
  <div class="componente">
                    <img src="${imageUrl}" alt="">
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <button>${pricePerUnit}$</button>
                </div>
          `;
;
contenedor.insertAdjacentHTML('beforeend',cardsHTML);
    return newProduct;
}


function updateProduct(uuid, updatedProductData) {
    const index = products.findIndex(product => product.uid === uuid); 

        if (index !== -1) {
            const productToUpdate = products[index];
        const tarjeta2 = document.getElementById(productToUpdate.title);
        if (updatedProductData.title) {
            productToUpdate.title = updatedProductData.title;
        }
        if (updatedProductData.description) {
            productToUpdate.description = updatedProductData.description;
        }
        if (updatedProductData.imageUrl) {
            productToUpdate.imageUrl = updatedProductData.imageUrl;
        }
        if (updatedProductData.categorie) {
            productToUpdate.categorie = updatedProductData.categorie;
        }
        if (updatedProductData.stock) {
            productToUpdate.stock = updatedProductData.stock;
        }
        if (updatedProductData.price) {
            productToUpdate.price = updatedProductData.price;
        }
        
        if (tarjeta2) {
            tarjeta2.innerHTML = `
            <div class="componente">
                              <img src="${imageUrl}" alt="">
                              <h3>${title}</h3>
                              <p>${description}</p>
                              <button>${pricePerUnit}$</button>
                          </div>
                    `;
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
        var tarjeta = document.getElementById(index1.title).closest('.col');
        tarjeta.remove();
        return true;
    } else {
        return false; 
    }
}



export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};