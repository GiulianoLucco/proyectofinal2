const express = require("express");
const { Carrito } = require("../DAOs/Carrito.Dao.class.js");

const routerCarrito = express.Router();

const carrito = new Carrito();

routerCarrito.post("/", async (req, res) => {
  const carritoCreado = await carrito.crearCarrito();
  res.send(carritoCreado);
});

routerCarrito.delete("/:id", async (req, res) => {
  const carritoBorrado = await carrito.borrar(req.params.id);
  console.log(carritoBorrado);
  res.send(carritoBorrado);
});

routerCarrito.get("/", async (req, res) => {
  const listaCarrito = await carrito.listarAll();
  res.send(listaCarrito);
});
routerCarrito.get("/:id", async (req, res) => {
  const prodCarr = await carrito.listar(req.params.id);
  res.send(prodCarr ?? { error: "no se encontro carrito" });
});

routerCarrito.post("/:id/productos/:idProd", async (req, res) => {
  const id = String(req.params.id);
  const idProd = String(req.params.idProd);
  const respuesta = await carrito.guardarProductoEnCarrito(idProd, id);

  res.send(respuesta);
});

module.exports = { routerCarrito };
