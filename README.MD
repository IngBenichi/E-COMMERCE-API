# API de Productos

Esta aplicación permite gestionar productos de una tienda en línea mediante una API REST creada con Node.js y Express, junto con un frontend básico en HTML y JavaScript.

## Endpoints de la API

- **GET /productos**: Obtiene la lista de todos los productos.
- **POST /productos**: Crea un nuevo producto. Requiere `nombre` y `precio` en el cuerpo de la solicitud.
- **PUT /productos/:id**: Actualiza un producto existente por su `id`. Requiere `nombre` y `precio` en el cuerpo de la solicitud.
- **DELETE /productos/:id**: Elimina un producto por su `id`.

## Archivos principales

- **server.js**: Implementa la API de productos con Express. Define los endpoints para crear, leer, actualizar y eliminar productos.
- **app.js**: Código frontend que interactúa con la API para mostrar y gestionar productos en la interfaz de usuario.
- **index.html**: Estructura HTML de la aplicación, con un formulario para añadir y actualizar productos, además de botones para ordenar los productos por precio.

## Ejecución

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor:
   ```bash
   node server.js
   ```
3. Abre `index.html` en el navegador para interactuar con la aplicación.
