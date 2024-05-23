import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from './data_handler.js';
class ShoppingCartException extends Error {
  constructor(message) {
      super(message);
      this.name = this.constructor.name;
  }
}

class ShoppingCart {
  constructor() {
      this._proxies = [];
      this._productos = [];
  }

  addItem(productUuid, amount) {
    const existingProxyIndex = this._proxies.findIndex(proxy => proxy.productUuid === productUuid);
    if (existingProxyIndex !== -1) {
        this._proxies[existingProxyIndex].amount += amount;
    } else {
        this._proxies.push(new ProductProxy(productUuid, amount));
        const producto = getProductById(productUuid);
        if (producto) {
            this._productos.push(producto);
            
        }

    }
}

  updateItem(productUuid, newAmount) {
      if (newAmount < 0) {
          throw new ShoppingCartException('La cantidad no puede ser negativa.');
      } else if (newAmount === 0) {
          this.removeItem(productUuid);
      } else {
          const existingProxy = this._proxies.find(proxy => proxy.productUuid === productUuid);
          if (existingProxy) {
              existingProxy.amount = newAmount;
          } else {
              throw new ShoppingCartException('El producto no está en el carrito.');
          }
      }
  }

  removeItem(productUuid) {
      const indexToRemove = this._productos.findIndex(producto => producto.uid === productUuid);
      const proxyIndexToRemove = this._proxies.findIndex(proxy => proxy.productUuid === productUuid);

      if (indexToRemove === -1 || proxyIndexToRemove === -1) {
          throw new ShoppingCartException('El producto o su proxy asociado no fueron encontrados en el carrito.');
      }

      this._productos.splice(indexToRemove, 1);
      this._proxies.splice(proxyIndexToRemove, 1);
  }

  calculateTotal() {
    let total = 0;
    for (const proxy of this._proxies) {
        const product = this._productos.find(p => p.uid === proxy.productUuid); // Se cambia a uid
        if (product) {
            total += product.pricePerUnit * proxy.amount;
        }
    }
    return total;
}
}
class ProductProxy {
  constructor(uuid, cantidad) {
      this.productUuid = uuid;
      this.amount = cantidad;
  }
}

export { ShoppingCart, ProductProxy, ShoppingCartException };