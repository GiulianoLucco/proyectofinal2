const { Producto } = require("./Producto.Dao.class.js");
const admin = require("firebase-admin");
const producto = new Producto();
class Carrito {
  constructor() {
    this.productos = [];
  }

  async listar(id) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    try {
      const doc = query.doc(String(id));
      const finded = await doc.get(id);
      return finded.data();
    } catch (e) {
      console.log(e);
    }
  }

  async listarAll() {
    const db = admin.firestore();
    const query = db.collection("carritos");
    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({
        timestamp: doc.data().timestamp,
        productos: doc.data().productos,
      }));

      return response || { error: "productos no encotrado" };
    } catch (e) {
      console.log(e);
    }
  }

  async crearCarrito() {
    const db = admin.firestore();
    const query = db.collection("carritos");
    let today = new Date();

    try {
      const doc = query.doc();
      const newCarr = await doc.create({
        timestamp: today.getDate(),
        productos: [],
      });
      return newCarr;
    } catch (e) {
      console.log(e);
    }
  }

  async guardarProductoEnCarrito(idProd, id) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    try {
      let produc = await producto.listar(idProd);
      const carrito = await this.listar(id);
      let doc = query.doc(id);
      let update;

      update = await doc.update({
        productos: admin.firestore.FieldValue.arrayUnion(produc),
      });

      console.log(update);

      return update;
    } catch (e) {
      console.log(e);
    }
  }

  async borrar(id) {
    const db = admin.firestore();
    const query = db.collection("carritos");
    try {
      let doc = query.doc(id);
      const deleteCarr = await doc.delete();
      return deleteCarr;
    } catch (e) {
      console.log(e);
    }
  }

  async producDelete(idCarr, idProd) {
    const db = admin.firestore();
    const query = db.collection("carritos");

    try {
      const carrito = await this.listar(idCarr);
      let doc = query.doc(idCarr);
      console.log(carrito);
      const productoFilter = carrito.productos.filter((produc) => {
        return produc.idProd != idProd;
      });

      let update;

      update = await doc.update({
        productos: admin.firestore.FieldValue.arrayUnion(productoFilter),
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = { Carrito };
