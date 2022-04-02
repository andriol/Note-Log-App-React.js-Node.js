const router = require('express').Router();
const fs = require('fs');
const { v4: uuid4 } = require('uuid');

const readData = () => {
  return JSON.parse(fs.readFileSync('./data/notes.json'));
};

const writeData = (myData) => {
  return fs.writeFileSync('./data/notes.json', JSON.stringify(myData));
};
//get notes

router.get('/', (req, res) => {
  const notes = readData();
  const notesList = notes.map((note) => {
    return note;
  });
  res.status(200).json(notesList);
});
// post notes

router.post('/', (req, res) => {
  const notes = readData();
  const newNote = {
    id: uuid4(),
    date: new Date(),
    ...req.body,
  };
  const { text } = req.body;
  if (!text) {
    res.status(400).send('Please write your note');
  } else {
    notes.push(newNote);
    writeData(notes);
    res.status(201).json(newNote);
  }
});

// get individual note

router.get('/:id', (req, res) => {
  const notes = readData();
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  res.status(200).json(note);
});
//update note

router.put('/:id', (req, res) => {
  const notes = readData();
  const id = req.params.id;
  let updateNote;
  const updatedNotes = notes.map((note) => {
    if (note.id === id) {
      updateNote = {
        id: note.id,
        ...req.body,
      };
      return updateNote;
    } else {
      return note;
    }
  });
  writeData(updatedNotes);
  res.status(200).json(updateNote);
});
//delete note

router.delete('/:id', (req, res) => {
  const notes = readData();
  const id = req.params.id;
  const note = notes.filter((note) => note.id !== id);
  writeData(note);
  res.status(200).json('note deleted');
});
module.exports = router;
