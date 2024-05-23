// Inicializa el carrito de compras en sessionStorage si no existe
function initializeCart() {
    if (!sessionStorage.getItem('shoppingCart')) {
      sessionStorage.setItem('shoppingCart', JSON.stringify([]));
    }
  }
  
  // Lee el carrito de compras desde sessionStorage
  function readCart() {
    return JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  }
  
  // Guarda el carrito de compras en sessionStorage
  function saveCart(cart) {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  
  // Borra el carrito de compras de sessionStorage
  function clearCart() {
    sessionStorage.removeItem('shoppingCart');
  }
  
  export { initializeCart, readCart, saveCart, clearCart };
  