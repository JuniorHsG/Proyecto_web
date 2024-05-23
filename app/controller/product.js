const { generateUUID } = require('./util');

class ProductException extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      this.message = message;
    }
  }
  class Producto {
    #uid;
    constructor(title,description,imageurl,categorie,stock,price){
        this.#uid=generateUUID();
        this.title = title;
        this.description = description;
        this.imageUrl = imageurl;
        this.categorie = categorie;
        this.stock = stock;
        this.price = price

    }
    get uid() {
      return this.#uid;
    }
    set uid(value) {
      throw new ProductException('El atributo uid no puede ser modificado directamente.');
    }
    get title() {
        return this._title;
      }
    
      set title(value) {
        if (typeof value !== 'string' || value.trim() === '') {
          throw new ProductException('El título del producto no puede estar vacío.');
        }
        this._title = value;
      }
    
      get description() {
        return this._description;
      }
    
      set description(value) {
        if (typeof value !== 'string' || value.trim() === '') {
          throw new ProductException('La descripción del producto no puede estar vacía.');
        }
        this._description = value;
      }
    
      get imageUrl() {
        return this._imageUrl;
      }
    
      set imageUrl(value) {
        if (typeof value !== 'string' || value.trim() === '') {
          throw new ProductException('La URL de la imagen del producto no puede estar vacía.');
        }
        this._imageUrl = value;
      }
    
    
      get categorie() {
        return this._categorie;
      }
    
      set categorie(value) {
        if (typeof value !== 'string' || value.trim() === '') {
          throw new ProductException('La unidad del producto no puede estar vacía.');
        }
        this._categorie = value;
      }
    
      get stock() {
        return this._stock;
      }
    
      set stock(value) {
        if (typeof value !== 'number' || value < 0) {
          throw new ProductException('El stock del producto debe ser un número positivo.');
        }
        this._stock = value;
      }
    
      get price() {
        return this._price;
      }
    
      set price(value) {
        if (typeof value !== 'number' || value < 0) {
          throw new ProductException('El precio por unidad del producto debe ser un número positivo.');
        }
        this._price = value;
      }
      
    
      toJSON() {
        return {
            uid:this.#uid,
            title: this.title,
            description: this.description,
            imageUrl: this.imageUrl,
            categorie: this.categorie,
            stock: this.stock,
            price: this.price,
        };
    }

      static createFromJson(jsonValue) {
        try {
          const parsedJson = JSON.parse(jsonValue);
          return new Producto(
            parsedJson.title,
            parsedJson.description,
            parsedJson.imageUrl,
            parsedJson.categorie,
            parsedJson.stock,
            parsedJson.price,
          );
        } catch (error) {
          throw new ProductException('Error al crear el producto desde JSON: ' + error.message);
        }
      }
    
      static createFromObject(obj) {
        if (!(obj instanceof Producto)) {
          throw new ProductException('El objeto recibido no es una instancia de Producto.');
        }
    
        return new Producto(
          obj.title,
          obj.description,
          obj.imageUrl,
          obj.categorie,
          obj.stock,
          obj.price,
        );
      }
    
      static cleanObject(obj) {
        const cleanObj = {};
        Object.keys(obj).forEach(key => {
          if (Object.hasOwnProperty.call(obj, key)) {
            if (key in Producto.prototype) {
              cleanObj[key] = obj[key];
            }
          }
        });
        return cleanObj;
      }
    }
    module.exports = {
    Producto
    }




