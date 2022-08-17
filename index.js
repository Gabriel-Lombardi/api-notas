// imports
import express from 'express';
import mongoose from 'mongoose';
// config vars
const PORT = process.env.PORT || 3000;
const DB   = process.env.DB   || 'mongodb://127.0.0.1/notes';

mongoose.connect(DB)
  .then(() => console.log('DB conectada'))
  .catch(err => console.log(err));

const NoteSchema = new mongoose.Schema({
  text: String,
  done: { type: Boolean, default: false }
});
const Note = mongoose.model('Note', NoteSchema);

const notes = [];
// base de datos de mentira
// const notes = [
//   {
//     id: 1,
//     text: 'Lavar la ropa',
//     done: false
//   },
//   {
//     id: 2,
//     text: 'Estudiar node',
//     done: false
//   },
//   {
//     id: 3,
//     text: 'Hacer las compras',
//     done: false
//   },
//   {
//     id: 4,
//     text: 'Preparar los examenes',
//     done: false
//   }
// ];


const app = express();
app.use(express.static('public'));
app.use(express.json());

// en una API que devuelve JSON
// lo que se dice una API REST
// GET para leer datos
// POST para crear datos
// PUT para modificar
// DELETE para borrar

// devuelve todas las notas
app.get('/notes', (req, res) => {
  Note.find((err, notes) => {
    res.status(200).json(notes);
  });
});
// devuelve la nota con id: id
app.get('/notes/:id', (req, res) => {
  let id = req.params.id;
  Note.findById(id, (err, note) => {
    res.status(200).json(note);
  });
  // let result = notes.filter(note => note.id === id);
});
// crea una nota nueva
app.post('/notes', (req, res) => {
  let { text } = req.body;
  console.log(req.body);
  let newNote = new Note({ text });
  // notes.push(newNote);
  newNote.save((err, note) => {
    // if (err) throw err;
    res.status(201).json(note);
  });
});

app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`);
});
