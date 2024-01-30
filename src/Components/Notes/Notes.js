import { useState, useEffect } from 'react';
import './Notes.scss';

const Notes = ({notesData, date}) => {

    const [noteText, setNoteText] = useState('');


    useEffect(() => {
        if (notesData && notesData.length > 0) {
            setNoteText(notesData[0].note);
        }

    }, [notesData]);

    console.log(noteText)

    const handleInputChange = (event) => {
        setNoteText(event.target.value);
    };

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