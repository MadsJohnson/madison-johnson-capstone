import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Notes.scss';

const Notes = ({notesData, date, baseUrl}) => {

    const [noteText, setNoteText] = useState('');
    const [noteId, setNoteId] = useState(null)
    const timerRef = useRef(null);


    useEffect(() => {
        if (notesData && notesData.length > 0) {
            setNoteText(notesData[0].note);
            setNoteId(notesData[0].note_id)
        }

        else {
            if (notesData && notesData.length === 0) {
                postNote();
            }
        }

    }, [notesData]);

    console.log(noteText)
    console.log(noteId)

    const postNote = () => {
        const token = sessionStorage.token;
        axios.post(
            `${baseUrl}/notes`,
            {
                note: noteText,
                due_date: date,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                console.log('note posted successfully:', response.data);
                // Set the note_id in the state
                setNoteId(response.data.note_id);
            })
            .catch(error => {
                console.error('Error posting note :', error);
            });
    };

    const putNote = () => {
        const token = sessionStorage.token;
        axios
            .put(
                `${baseUrl}/notes/${noteId}`,
                {
                    note: noteText,
                    due_date: date,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(response => {
                console.log('Note updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating note:', error);
            });
    };



    useEffect(() => {
        if (noteText !== '' && noteId !== null) {
            // Only initiate the putNote if noteText is not empty and noteId is not null
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                putNote();
            }, 1000);
        }
    }, [noteText, noteId]);

    const handleInputChange = event => {
        setNoteText(prev => {
            const newText = event.target.value;
            return newText;
        });
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