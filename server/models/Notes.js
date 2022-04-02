const fs = require('fs');
const { v4: uuid4 } = require('uuid');

const readData = () => {
  return JSON.parse(fs.readFileSync('.data/notes.json'));
};

const writeData = (myData) => {
  return fs.writeFileSync('./data/notes.json', JSON.stringify(myData));
};

const getNotes = () => {
  const notes = readData();
  return notes;
};

const postNotes = (newNote) => {
  const notes = readData();
  const newNotes = {
    id: uuid4(),
    date: new Date(),
    ...newNote,
  };
  readData.push(newNotes);
  writeData(notes);
  return newNotes;
};

const getSingleNote = () => {
  const notes = readData();
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);
  return note;
};

const updateNote = () => {
  const notes = readData();
  const id = req.params.id;
  let updateNote;
  const updatedNote = notes.map((note) => {
    if (note.id === id) {
      updateNote = {
        id: note.id,
        ...req.body,
      };
      return updatedNote;
    }
  });
};

const deleteNote = () => {
  const notes = readData();
  const id = req.params.id;
  const note = notes.filter((note) => note.id !== id);
  return note;
};
module.exports = {
  getNotes,
  postNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
