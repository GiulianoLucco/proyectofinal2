const admin = require("firebase-admin");
const serviceAccount = require("../DAOs/DB/back-end-1a5f6-firebase-adminsdk-jey4z-b394aa2ffc.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class Producto {
  constructor() {}

  async listarAll() {
    try {
      const db = admin.firestore();
      const query = db.collection("productos");
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({
        nombre: doc.data().nombre,
        codigo: doc.data().codigo,
        precio: doc.data().precio,
        foto: doc.data().foto,
        stock: doc.data().stock,
        descripcion: doc.data().descripcion,
        idProd: doc.data().idProd,
      }));

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async listar(id) {
    const db = admin.firestore();
    const query = db.collection("productos");
    try {
      const doc = query.doc(String(id));
      const findId = await doc.get();
      return findId.data();
    } catch (error) {
      console.log("No se encontro el id");
    }
  }

  async guardar(prod) {
    const db = admin.firestore();
    const query = db.collection("productos");
    try {
      let doc = query.doc();
      await doc.create(prod);

      const idProd = doc.id;
      const producComplete = { ...prod, idProd };

      const docUpdate = query.doc(idProd);
      const producUpdated = await docUpdate.update(producComplete);
      return producUpdated;
    } catch (e) {
      console.log(e);
    }
  }

  async actualizar(prod, id) {
    const db = admin.firestore();
    const query = db.collection("productos");
    try {
      let doc = query.doc(id);
      const update = await doc.update(prod);
      return update;
    } catch (e) {
      console.log(e);
    }
  }

  async borrar(id) {
    const db = admin.firestore();
    const query = db.collection("productos");
    try {
      let doc = query.doc(id);
      const prodDelete = await doc.delete();
      return prodDelete;
    } catch (error) {
      console.log("No se encontro el id");
    }
  }
}

module.exports = { Producto };
