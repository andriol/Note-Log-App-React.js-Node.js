import React from 'react';
import { ImBin } from 'react-icons/im';
import { ImPencil } from 'react-icons/im';
import '../App.css';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Note = ({ notes, deleteHandle, updateNote }) => {
  function dateFunc(date) {
    const dateConfig = new Date(date);
    const year = dateConfig.getFullYear();
    const day = weekdays[dateConfig.getDay()];
    const dayNum = dateConfig.getDate();
    return `${day} ${dayNum}, ${year}`;
  }
  return notes.map((note) => {
    return (
      <div className='note' key={note.id}>
        <h2>{note.text}</h2>
        <h3>{dateFunc(note.date)}</h3>
        <div className='btns'>
          <button
            type='submit'
            className='btn btn-info'
            onClick={() => updateNote(note.id, note.text)}
          >
            <ImPencil />
          </button>
          <button
            type='submit'
            className='btn btn-danger'
            onClick={() => deleteHandle(note.id)}
          >
            <ImBin />
          </button>
        </div>
      </div>
    );
  });
};

export default Note;
