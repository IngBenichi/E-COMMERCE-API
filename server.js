const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


let productos = [
  { id: 1, nombre: "Camiseta", precio: 25000 },
  { id: 2, nombre: "Jeans", precio: 40000 },
  { id: 3, nombre: "Zapatos", precio: 60000 },
  { id: 4, nombre: "Chaqueta", precio: 80000 },
  { id: 5, nombre: "Sombrero", precio: 15000 },
  { id: 6, nombre: "Bolso", precio: 50000 },
  { id: 7, nombre: "Gafas de sol", precio: 20000 },
  { id: 8, nombre: "Pantalones cortos", precio: 30000 },
  { id: 9, nombre: "Bufanda", precio: 12000 },
  { id: 10, nombre: "Guantes", precio: 10000 }
];


app.get("/productos", (req, res) => {
  res.json(productos);
});

app.post("/productos", (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1; 
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

app.put("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  const productoIndex = productos.findIndex((p) => p.id === parseInt(id));

  if (productoIndex !== -1) {
    productos[productoIndex].nombre = nombre;
    productos[productoIndex].precio = precio;
    res.json(productos[productoIndex]);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const productoIndex = productos.findIndex((p) => p.id === parseInt(id));

  if (productoIndex !== -1) {
    productos.splice(productoIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});


app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
