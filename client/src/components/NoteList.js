import React from 'react';
import '../App.css';

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: '',
    };
    this.addHandle = this.addHandle.bind(this);
    this.updateHandle = this.updateHandle.bind(this);
  }
  addHandle() {
    if (this.state.note.length) {
      this.props.addHandle(this.state.note);
      this.setState({ note: '' });
    }
  }
  updateHandle(e) {
    this.setState({
      note: e.target.value,
    });
  }
  render() {
    console.log(this.state.note);
    return (
      <div>
        <form className='note__log-form'>
          <input
            type='text'
            name='note'
            onChange={this.updateHandle}
            value={this.state.note}
            placeholder='Take a note...'
            autoComplete='off'
          />
          <input type='button' value='add note' onClick={this.addHandle} />
        </form>
      </div>
    );
  }
}

export default NoteList;
