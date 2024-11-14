// servidor.js
const express = require("express");
const { sql, poolPromise } = require("./baseDatos");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/productos", async (req, res) => {
  try {
    const pool = await poolPromise;
    const resultado = await pool.request().query("SELECT * FROM Productos");
    res.json(resultado.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Agregar un producto
app.post("/productos", async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("descripcion", sql.Text, descripcion)
      .input("precio", sql.Decimal(10, 2), precio)
      .input("stock", sql.Int, stock)
      .query(
        "INSERT INTO Productos (nombre, descripcion, precio, stock) VALUES (@nombre, @descripcion, @precio, @stock)"
      );
    res.status(201).send("Producto creado exitosamente");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Eliminar un producto por ID
app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const pool = await poolPromise;
      await pool.request().input('id', sql.Int, id).query('DELETE FROM Productos WHERE id = @id');
      res.status(200).json({ mensaje: `Producto con id ${id} eliminado exitosamente` });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  });

  // Editar un producto por ID
app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;
  
    try {
      const pool = await poolPromise;
      await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.VarChar, nombre)
        .input('descripcion', sql.Text, descripcion)
        .input('precio', sql.Decimal(10, 2), precio)
        .input('stock', sql.Int, stock)
        .query(`
          UPDATE Productos
          SET nombre = @nombre,
              descripcion = @descripcion,
              precio = @precio,
              stock = @stock
          WHERE id = @id
        `);
      res.status(200).json({ mensaje: `Producto con id ${id} actualizado exitosamente` });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  });

  
app.listen(process.env.PORT, () =>
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
);
