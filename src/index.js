const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig.json');

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://prueba-tecnica-juanmagf-20f27.firebaseio.com',
});

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Rutas
app.get('/books', async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('books').get();
    const books = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de libros.' });
  }
});

app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const doc = await admin.firestore().collection('books').doc(bookId).get();

    if (!doc.exists) {
      res.status(404).json({ error: 'Libro no encontrado.' });
    } else {
      res.json({ id: doc.id, ...doc.data() });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los detalles del libro.' });
  }
});

app.post('/books', async (req, res) => {
  const newBook = req.body;

  try {
    const docRef = await admin.firestore().collection('books').add(newBook);
    res.json({ id: docRef.id, ...newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear un nuevo libro.' });
  }
});

app.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const updatedBook = req.body;

  try {
    const docRef = admin.firestore().collection('books').doc(bookId);
    await docRef.update(updatedBook);
    res.json({ id: bookId, ...updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la información del libro.' });
  }
});

app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    await admin.firestore().collection('books').doc(bookId).delete();
    res.json({ message: 'Libro eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el libro.' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});