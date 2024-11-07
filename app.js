const apiUrl = "http://localhost:3000/productos";


async function obtenerProductos() {
  try {
    const response = await fetch(apiUrl);
    const productos = await response.json();
    renderizarProductos(productos);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
}


async function crearProducto(nombre, precio) {
  const nuevoProducto = { nombre, precio };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    });
    
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const productoCreado = await response.json();
    console.log("Producto creado:", productoCreado);
    obtenerProductos();

   
    mostrarMensaje("El producto se añadió correctamente.");
  } catch (error) {
    console.error("Error al crear el producto:", error);
  }
}

function mostrarMensaje(mensaje) {
  const mensajeElemento = document.createElement("div");
  mensajeElemento.textContent = mensaje;
  mensajeElemento.style.color = "green";
  mensajeElemento.style.marginTop = "10px";
  document.body.appendChild(mensajeElemento);

  
  setTimeout(() => {
    mensajeElemento.remove();
  }, 3000);
}



async function actualizarProducto(id, nombre, precio) {
  const productoActualizado = { nombre, precio };
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoActualizado)
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }

    const producto = await response.json();
    console.log("Producto actualizado:", producto);
    obtenerProductos();
    ocultarFormularioActualizacion();

    // Mostrar mensaje de confirmación
    mostrarMensaje("El producto se actualizó correctamente.");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
}

function mostrarMensaje(mensaje) {
  const mensajeElemento = document.createElement("div");
  mensajeElemento.textContent = mensaje;
  mensajeElemento.style.color = "green";
  mensajeElemento.style.marginTop = "10px";
  document.body.appendChild(mensajeElemento);

  
  setTimeout(() => {
    mensajeElemento.remove();
  }, 3000);
}



async function eliminarProducto(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE'
    });

    if (response.status === 204) {
      console.log("Producto eliminado");
      obtenerProductos();

      
      mostrarMensaje("El producto se eliminó correctamente.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
  }
}

function mostrarMensaje(mensaje) {
  const mensajeElemento = document.createElement("div");
  mensajeElemento.textContent = mensaje;
  mensajeElemento.style.color = "green";
  mensajeElemento.style.marginTop = "10px";
  document.body.appendChild(mensajeElemento);

  
  setTimeout(() => {
    mensajeElemento.remove();
  }, 3000);
}



async function ordenarAscendente() {
  const productos = await obtenerProductosApi(); 
  productos.sort((a, b) => a.precio - b.precio);
  renderizarProductos(productos);
}


async function ordenarDescendente() {
  const productos = await obtenerProductosApi();
  productos.sort((a, b) => b.precio - a.precio);
  renderizarProductos(productos);
}


async function obtenerProductosApi() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return [];
  }
}


function renderizarProductos(productos) {
    const listaProductos = document.getElementById("productos-lista");
    listaProductos.innerHTML = "";
  
    productos.forEach(producto => {
      
      const precioFormateado = new Intl.NumberFormat('es-ES').format(producto.precio);
  
      const productoElemento = document.createElement("li");
      productoElemento.innerHTML = `${producto.nombre} - $${precioFormateado} 
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
        <button onclick="mostrarFormularioActualizar(${producto.id}, '${producto.nombre}', ${producto.precio})">Editar</button>`;
      listaProductos.appendChild(productoElemento);
    });
  }
  


function mostrarFormularioActualizar(id, nombre, precio) {
  const nombreInput = document.getElementById("nombre-actualizacion");
  const precioInput = document.getElementById("precio-actualizacion");

  nombreInput.value = nombre;
  precioInput.value = precio;

  const formularioActualizacion = document.getElementById("formulario-actualizacion");
  formularioActualizacion.style.display = "block";

  
  const botonActualizar = document.getElementById("boton-actualizar");
  botonActualizar.onclick = () => {
    const nuevoNombre = nombreInput.value;
    const nuevoPrecio = parseFloat(precioInput.value);
    actualizarProducto(id, nuevoNombre, nuevoPrecio);
  };
}


function ocultarFormularioActualizacion() {
  const formularioActualizacion = document.getElementById("formulario-actualizacion");
  formularioActualizacion.style.display = "none";
}


document.getElementById("formulario").addEventListener("submit", (e) => {
  e.preventDefault();
  
  let nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);

  
  nombre = nombre.trim();

  
  const nombreValido = /^[A-Za-z\s]+$/.test(nombre);

  if (!nombreValido || nombre.length === 0) {
    alert("El nombre del producto solo debe contener letras y no puede estar vacío.");
    return;  
  }

  
  crearProducto(nombre, precio);
});

obtenerProductos();




document.getElementById("ordenarAscendente").addEventListener("click", ordenarAscendente);
document.getElementById("ordenarDescendente").addEventListener("click", ordenarDescendente);
