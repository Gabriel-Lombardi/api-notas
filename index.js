// si está la línea type: module; podes usar esta forma
import express from 'express'
import mongoose from 'mongoose'
// config vars
const PORT = process.env.PORT || 3000;
const DB   = process.env.DB   || 'mongo://localhost/notes'

mongoose.connect(DB)
  .then(() => console.log('DB conectada'))
  .catch(err => console.log(err));

const NoteSchema = new mongoose.Schema({
  text: String,
  done: Boolean
});
const Note = mongoose.model('Note', NoteSchema);

const notes = [];
const app = express();
app.use(express.static('public'));
app.use(express.json());

// en una API que devuelve JSON
// la que se dice una API REST
// GET para leer datos
// POST para crear datos
// PUT para modificar
// DETELE para borrar

app.get('/notes', (req, res) => {
  res.status(200).json(notes);
});
app.get('/notes/:id', (req, res) => {
  //res.send('Acá te pasa la nota con id' + req.params.id);
  let id = +req.params.id;
  let result = notes.filter(note => note.id === id);
  res.status(200).json(result);
});

app.get('/notes/:id', (req, res) => {
  let id = req.params.id;
  Note.findById(id, (err, note) => {
    res.status(200).json(note);
  });
  // let result = notes.filter(note => note.id === id);
});
// app.post('/notes/123', (req, res) => {
//   res.status(404).json({ msg: 'bien pibe' });
// });
app.post('/notes', (req, res) => {
  let {id, text, done} = req.body;
  console.log(req.body);
  let newNote = new Note({ text, done });
  // notes.push(newNote);
  newNote.save((err, note) => {
    // if (err) throw err;
    res.status(201).json(note);
  });
});

app.listen(PORT, () => {
  console.log(`Server escuchando en puerto ${PORT}`)
});
