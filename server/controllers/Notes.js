const model = require('../models/Notes');

function getAllNotes(req, res) {
  const notes = model.getNotes();
  res.status(200).json(notes);
}

function postNote(req, res) {
  const notes = model.postNotes(...req.body);
  res.status(201).json(notes);
}
function getSingleNote(req, res) {
  const id = req.params.id;
  const note = model.getSingleNote(id);
  res.status(200).json(note);
}

function updateNote(req, res) {
  id = req.params.id;
  const note = model.updateNote(id);
  res.status(200).json(note);
}
function deleteNote(req, res) {
  id = req.params.id;
  const note = model.deleteNote(id);
  res.status(200).json(note);
}
module.exports = {
  getAllNotes,
  postNote,
  getSingleNote,
  updateNote,
  deleteNote,
};
