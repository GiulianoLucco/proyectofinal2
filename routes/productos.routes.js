const express = require("express");
const { Producto } = require("../DAOs/Producto.Dao.class.js");

const routerProductos = express.Router();

const producto = new Producto();
function validarAdmin(req, res, next) {
  if (req.query.admin) next();
  else res.send("Usted no tiene acceso");
}

routerProductos.post("/", async (req, res) => {
  const productoCreado = await producto.guardar(req.body);
  res.send(productoCreado);
});

routerProductos.delete("/:id", async (req, res) => {
  const productoBorrado = await producto.borrar(req.params.id);
  res.send(productoBorrado ?? { error: "id no encontrado" });
});

routerProductos.get("/", async (req, res) => {
  const listaProductos = await producto.listarAll();
  res.send(listaProductos);
});

routerProductos.get("/:id", async (req, res) => {
  const productoBuscado = await producto.listar(req.params.id);
  res.send(productoBuscado ?? { error: "id no encontrado" });
});

routerProductos.put("/:id", async (req, res) => {
  const id = req.params.id;
  const productoMod = await producto.actualizar(req.body, id);
  res.send(productoMod);
});

module.exports = { routerProductos };
