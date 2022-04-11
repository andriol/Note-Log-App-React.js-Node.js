import React from 'react';
import NoteList from './components/NoteList';
import Note from './components/Note';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      note: {},
      editMode: false,
    };
    this.addHandle = this.addHandle.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  // display notes
  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/notes`).then(({ data }) => {
      const dataArray = data.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });

      this.setState({
        notes: dataArray,
      });
    });
  }

  // add note
  addHandle(note) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/notes`, { text: note })
      .then(({ data }) => {
        this.setState({
          notes: [data, ...this.state.notes],
        });
      });
  }
  // delete note
  deleteHandle(id) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/notes/${id}`)
      .then(({ data }) => {
        this.setState({
          notes: this.state.notes.filter((note) => note.id !== id),
        });
      });

    window.location.reload();
  }

  //update note
  updateNote(id, updatedNote) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/notes/${id}`, {
        text: updatedNote.text,
      })
      .then(({ data }) => {
        this.setState(
          function (state) {
            const notes = state.notes.map((note) => {
              if (note.id === updatedNote.id) {
                note.text = updatedNote.text;
                note.date = new Date();
              }

              return note;
            });

            return { notes };
          },
          () => {
            console.log(this.state);
            this.setState(this.state.notes);
          }
        );
        const notes = this.state.notes;
        const note = notes.find((note) => note.id === id);
        console.log(notes, note);
        this.setState(
          {
            note: note,
            editMode: true,
          },
          () => {
            console.log(this.state);
          }
        );
      });
  }

  render() {
    return (
      <>
        <div className='App'>
          <h1>Note Log</h1>
          <NoteList
            notes={this.state.notes}
            note={this.state.note ? this.state.note : ''}
            editMode={this.state.editMode}
            addNote={this.addHandle}
            updateNote={this.updateNote}
            changeState={this.changeState}
          />
          <div className='notes'>
            <Note
              notes={this.state.notes}
              deleteHandle={this.deleteHandle}
              updateNote={this.updateNote}
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
