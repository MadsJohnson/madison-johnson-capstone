import { useState } from 'react';
import './Notes.scss';

const Notes = (notesData, date) => {

const [noteText, setNoteText] = useState('');

const handleInputChange = (event) => {
    setNoteText(event.target.value);
};

console.log(noteText)

    return (
        <div className="notes">
            <h2 className="notes__title">Notes</h2>
            <textarea
                className="notes__text-input"
                type="text"
                value={noteText}
                onChange={handleInputChange}
            ></textarea>

        </div>
    )
}

export default Notes