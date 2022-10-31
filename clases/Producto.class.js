const fs = require("fs");
class Producto {
  productos = [];
  constructor() {
    this.id = 0;
  }

  async save(producto) {
    try {
      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(producto, null, 2),
        "utf-8"
      );
    } catch (e) {
      console.log(e);
    }
  }

  async listarAll() {
    try {
      let contenido = await fs.promises.readFile("./productos.txt", "utf-8");
      return contenido || { error: "producto no encotrado" };
    } catch (e) {
      console.log(e);
    }
  }

  async listar(id) {
    try {
      const datosAlmacenados = await this.listarAll();
      const datos = JSON.parse(datosAlmacenados);
      const result = datos.find((objeto) => objeto.id === id);

      return result;
    } catch (error) {
      console.log("No se encontro el id");
    }
  }

  async guardar(prod) {
    prod.id = ++this.id;
    prod.timeStamp = Date.now();
    const contenido = await this.listarAll();
    const datos = JSON.parse(contenido);
    const indice = datos.sort((a, b) => b.id - a.id)[0].id;
    prod.id = indice + 1;
    datos.push(prod);
    this.save(datos);
    return prod;
  }

  async actualizar(prod, id) {
    const contenido = await this.listarAll();
    const datos = JSON.parse(contenido);
    const index = datos.findIndex((x) => x.id === id);
    if (index >= 0) {
      datos.splice(index, 1, { ...prod, id });
      this.productos = datos;
      this.save(datos);
      return datos;
    }
  }

  async borrar(id) {
    try {
      const contenido = await this.listarAll();
      const datos = JSON.parse(contenido);
      let index = datos.findIndex((prod) => prod.id == id);
      datos.splice(index, 1);
      console.log(datos);
      this.save(datos);
      return datos;
    } catch (error) {
      console.log("No se encontro el id");
    }
  }
}

module.exports = { Producto };
