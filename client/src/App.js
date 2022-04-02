import React from 'react';
import NoteList from './components/NoteList';
import Note from './components/Note';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    let notes;

    this.state = {
      notes: [],
    };
    this.addHandle = this.addHandle.bind(this);
  }
  addHandle(note) {
    const id = uuidv4();
    const newNote = {
      id,
      text: note,
      date: new Date(),
    };
    this.setState({
      notes: [newNote, ...this.state.notes],
    });
  }

  render() {
    console.log(this.state.notes);
    return (
      <>
        <div className='App'>
          <h1>Note Log</h1>
          <NoteList notes={this.state.notes} addHandle={this.addHandle} />
          <div className='notes'>
            <Note notes={this.state.notes} />
          </div>
        </div>
      </>
    );
  }
}

export default App;
