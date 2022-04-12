import React from 'react';
import '../App.css';

class NoteList extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    this.addNote = this.addNote.bind(this);
    this.updateHandle = this.updateHandle.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateHandle2 = this.updateHandle2.bind(this);

    this.state = {
      noteObj: this.props.note,
      note: '',
      editMode: this.props.editMode,
    };
  }

  addNote() {
    if (this.state.note.length) {
      this.props.addNote(this.state.note);
      this.setState({ note: '' });
    }
  }
  updateHandle(e) {
    this.setState({
      note: e.target.value,
    });
  }

  updateHandle2(e) {
    const { noteObj } = this.state;
    this.setState({
      noteObj: {
        ...noteObj,
        text: e.target.value,
      },
    });
  }
  updateNote() {
    this.props.updateNote(this.props.note.id, this.state.noteObj);
    const { noteObj } = this.state;
    this.setState({
      noteObj: {
        ...noteObj,
        text: '',
      },
      editMode: false,
    });
  }
  componentDidUpdate() {
    if (this.props.note.id !== this.state.noteObj.id) {
      this.setState({
        noteObj: this.props.note,
        editMode: this.props.editMode,
      });
    }
  }

  render() {
    return this.state.editMode ? (
      <div>
        <form className='note__log-form' onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            name='text'
            onChange={this.updateHandle2}
            value={this.state.noteObj.text || ''}
            placeholder='Take a note...'
            autoComplete='off'
          />

          <input type='button' value='edit note' onClick={this.updateNote} />
        </form>
      </div>
    ) : (
      <div>
        <form className='note__log-form' onSubmit={(e) => e.preventDefault()}>
          <input
            type='text'
            name='note'
            onChange={this.updateHandle}
            value={this.state.note}
            placeholder='Take a note...'
            autoComplete='off'
          />
          <input type='button' value='add note' onClick={this.addNote} />
        </form>
      </div>
    );
  }
}

export default NoteList;
