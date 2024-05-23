let allProducts = [];
import { initializeCart, readCart, saveCart,clearCart } from './cart.js';

fetch('/products')
  .then(response => response.json())
  .then(products => {
    // Guardar todos los productos
    allProducts = products;
    // Cargar los productos de la primera página
    loadAllProducts();
  })
  .catch(error => console.error('Error al obtener la lista de productos:', error));

  function loadAllProducts() {
    const productsContainer = document.getElementById('content_products');
    productsContainer.innerHTML = '';
  
    allProducts.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('componente');
      productElement.innerHTML = `
        <img src="${product.imageUrl}" alt="Componente 1">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>
        <button class="add-to-cart-button" data-uid="${product.uid}" data-title="${product.title}">Añadir</button>
      `;
      productsContainer.appendChild(productElement);
    });
    initializeCart()
    // Asignar eventos a los botones después de haberlos agregado al DOM
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
      button.addEventListener('click', (event) => {
          const productUid = event.target.getAttribute('data-uid');
          const productTitle = event.target.getAttribute('data-title');
          addToCart(productUid, productTitle);
      });
  });
}

// Función para añadir productos al carrito
function addToCart(productUid, productTitle) {
  console.log(`addToCart called with uid: ${productUid} and title: ${productTitle}`);
  
  // Realiza la solicitud para agregar el producto al carrito
  fetch('/products/cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify([productUid]) // Enviar un arreglo con la uid
  })
  .then(response => {
      if (response.ok) {
        const selectedProductUid = productUid
        let cart = readCart();
        const existingProductIndex = cart.findIndex(item => item.uid === selectedProductUid);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ uid: selectedProductUid, title: productTitle, quantity: 1 });
        }
        saveCart(cart);
          alert(`Producto "${productTitle}" agregado al carrito`);
          console.log(readCart());

        // Obtener los productos del carrito y actualizar su cantidad
        const cartProducts = JSON.parse(sessionStorage.getItem('shoppingCart'));
        const uids = cartProducts.map(product => `"${product.uid}"`);
        const quantities = cartProducts.map(product => product.quantity);
        
        // Realizar una solicitud fetch para actualizar el carrito en el servidor
        fetch('/products/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: `[${uids.join(',')}]`
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al obtener la lista de productos del carrito');
          }
          return response.json();
        })
        .then(products => {
          const productsWithQuantities = products.map((product, index) => ({
            ...product,
            quantity: quantities[index]
          }));
          sessionStorage.setItem('shoppingCart', JSON.stringify(productsWithQuantities));
          const Cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
          updateCartUI(Cart)
          console.log(productsWithQuantities)
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Hubo un error al cargar la lista de productos del carrito');
        });
      } else {
          return response.json().then(errorData => {
              throw new Error(errorData.error || 'Error desconocido');
          });
      }
  })
  .catch(error => {
      console.error('Error al agregar el producto al carrito:', error);
      alert(`Error al agregar el producto al carrito: ${error.message}`);
  });
}

function updateCartUI(cart) {
  const buyCardContainer = document.querySelector('.buy-card');

 buyCardContainer.innerHTML = '';
 const productElement = document.createElement('ul');
      productElement.classList.add('nav-card');
      productElement.innerHTML = `
      <li>Nombre</li>
      <li>Precio</li>
      <li>Cantidad</li>
      <li>total</li>
      `
      buyCardContainer.appendChild(productElement);
  cart.forEach(product => {
      const productElement = document.createElement('ul');
      const total=product.quantity* product.price
      productElement.classList.add('nav-card');
      productElement.innerHTML = `
      <li><p>${product.title}</p></li>
      <li><p>$${product.price}</p></li>
      <li><p>${product.quantity}</p></li>
      <li><p>${total}</p></li>
      `;
      buyCardContainer.appendChild(productElement);
  }

);
const productElement1 = document.createElement('button');
      productElement1.id = `vaciar`;
      productElement1.innerHTML = `
      Vaciar carrito
      `
      buyCardContainer.appendChild(productElement1);

      document.getElementById('vaciar').addEventListener('click', function() {
        const buyCardContainer = document.querySelector('.buy-card');
        buyCardContainer.innerHTML = ''; 
        const productElement = document.createElement('ul');
             productElement.classList.add('nav-card');
             productElement.innerHTML = `
             <li>Nombre</li>
             <li>Precio</li>
             <li>Cantidad</li>
             <li>total</li>
             `
             buyCardContainer.appendChild(productElement);
             const productElement1 = document.createElement('button');
             productElement1.id = `vaciar`;
             productElement1.innerHTML = `
             Vaciar carrito
             `
             buyCardContainer.appendChild(productElement1);
        clearCart()
      });
}




  