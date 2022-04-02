import React from 'react';
import NoteList from './components/NoteList';
import Note from './components/Note';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };
    this.addHandle = this.addHandle.bind(this);
  }
  // add note
  addHandle(note) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/notes`, { text: note })
      .then(({ data }) => {
        console.log(data.data);
        this.setState({
          notes: [data, ...this.state.notes],
        });
      });
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
