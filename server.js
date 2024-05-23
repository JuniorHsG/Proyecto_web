require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();
const { Producto } = require('./app/controller/product');
const dataHandler = require('./data_handler');
require('./DB')
app.use(express.json());
const Product = require('./app/models/Product');
const viewsDirectoryPath = path.join(__dirname, 'app', 'view');
const loadProducts = require('./config/loadProduct');

app.get('/products', async (req, res) => {
    const queryParams = req.query;

    // Cargar productos desde la base de datos
    const products = await loadProducts();
    if (Object.keys(queryParams).length === 0) {
        // Si no hay parámetros de consulta, devolver todos los productos
        res.json(products);
    } else {
        // Filtrar productos según los parámetros de consulta
        const filteredProducts = filterProducts(products, queryParams);
        res.json(filteredProducts);
    }
});

app.post('/products/cart',  async (req, res) => {
    if (!Array.isArray(req.body)) {
        return res.status(400).json({ error: 'El body debe ser un arreglo' });
    }

    try {
        const products = await Product.find();

        const productsToAdd = [];
        for (const productId of req.body) {
            console.log(productId)
            const product = products.find(prod => prod.uid === productId);

            if (!product) {
                return res.status(404).json({ error: `Producto con ID ${productId} no encontrado` });
            }
            productsToAdd.push(product);
        }

        return res.status(200).json(productsToAdd);
    } catch (err) {
        console.error('Error al cargar los productos:', err);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/products/:productId', (req, res) => {

  const products = dataHandler.loadProducts();
  const productId = req.params.productId;

 
  const product = dataHandler.getProductById(products,productId);
  

  if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(product);
});

const validateAdmin = (req, res, next) => {
  const isAdmin = req.headers['x-auth'] === 'admin';
  if (!isAdmin) {
      return res.status(403).json({ error: 'Acceso no autorizado, no se cuenta con privilegios de administrador' });
  }
  next(); // Llama a la siguiente función de middleware
};



app.post('/admin/products', async (req, res) => {
    try {
        const { title, description, imageUrl, categorie, stock, price } = req.body;
        console.log(stock)
        // Verifica si todos los atributos requeridos están presentes
        if (!title || !description || !imageUrl || !categorie || !stock || !price) {
            return res.status(400).json({ error: 'Faltan atributos requeridos para la creación del producto' });
        }
        
        // Crea un nuevo documento de producto utilizando el modelo de Mongoose
        const newProduct = new Product({
            title,
            description,
            imageUrl,
            categorie,
            stock,
            price
        });

        // Guarda el nuevo producto en la base de datos
        await newProduct.save();

        res.status(201).json({ message: `Producto "${title}" creado exitosamente` });
    } catch (error) {
        console.error('Error al registrar nuevo producto:', error);
        res.status(500).json({ error: 'Error interno del servidor al registrar nuevo producto' });
    }
});


app.get('/admin/product/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findOne({ uid: productId });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.put('/admin/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = req.body;

        const product = await Product.findOneAndUpdate({ uid: productId }, updatedProduct, { new: true });

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json({ message: 'Producto actualizado exitosamente', product });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.delete('/admin/products/:id', async (req, res) => {
    try {
        // Obtener el ID del producto de la solicitud
        const productId = req.params.id;

        // Buscar el producto por su ID
        const product = await Product.findOneAndDelete({ uid: productId });

        // Si el producto no existe, devolver un error 404
        if (!product) {
            return res.status(404).json({ error: 'El producto no existe' });
        }

        // Guardar el nombre del producto antes de eliminarlo
        const productName = product.name;


        // Responder con un mensaje de éxito
        res.status(200).json({ message: `Producto "${productName}" eliminado exitosamente` });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor al eliminar el producto' });
    }
});


app.use(express.static(viewsDirectoryPath));




app.get('/', (req, res) => {
  res.sendFile(path.join(viewsDirectoryPath, 'main.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(viewsDirectoryPath, 'login.html'));
});
app.get('/Admin-edition', (req, res) => {
    res.sendFile(path.join(viewsDirectoryPath, 'products.html'));
  });
app.get('/Admin-create', (req, res) => {
    res.sendFile(path.join(viewsDirectoryPath, 'create_product.html'));
  });
  app.get('/Admin-actualizar', (req, res) => {
    res.sendFile(path.join(viewsDirectoryPath, 'actualiza.html'));
  });


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
