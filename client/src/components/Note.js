import React from 'react';
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

const Note = ({ notes }) => {
  function dateFun(date) {
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
        <h3>{dateFun(note.date)}</h3>
      </div>
    );
  });
};

export default Note;
