let allProducts = [];

// Obtener productos desde el servidor
fetch('/products')
  .then(response => response.json())
  .then(products => {
    // Guardar todos los productos
    allProducts = products;
    // Cargar los productos en la tabla
    loadProductsIntoTable();
  })
  .catch(error => console.error('Error al obtener la lista de productos:', error));

function loadProductsIntoTable() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = '';

    allProducts.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.uid}</td>
            <td>${product.title}</td>
            <td>${product.stock}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td>${product.categorie}</td>
            <td><a href="${product.imageUrl}">Ver imagen</a></td>
            <td>
                <button class="editar-btn">Editar</button>
                <button class="eliminar-btn">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            // Obtener el elemento padre (<tr>) que contiene la información del producto
            const productRow = event.target.closest('tr');
            
            // Extraer la UID del producto del primer TD dentro del elemento padre
            const productId = productRow.querySelector('td:nth-child(1)').textContent;
            
            // Llamar a la función deleteProduct con la UID como argumento
            deleteProduct(productId);
        });
    });
    // Asignar eventos a los botones después de haberlos agregado al DOM
    document.querySelectorAll('.editar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.parentElement.parentElement.children[0].innerText;
            window.location.href = `/Admin-actualizar?productId=${productId}`;
        });
    });
    
}

function deleteProduct(productId) {
    fetch(`/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert(`Producto eliminado exitosamente`);
            window.location.href = '/Admin-edition';
            // Remover la fila del producto eliminado de la tabla
            allProducts = allProducts.filter(product => product.id !== productId);
           
        }
    })
    .catch(error => console.error('Error al eliminar el producto:', error));
}