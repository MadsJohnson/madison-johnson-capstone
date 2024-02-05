import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Notes.scss';

const Notes = ({notesData, date, baseUrl}) => {
    const [noteText, setNoteText] = useState('');
    const [noteId, setNoteId] = useState(null)
    const timerRef = useRef(null);

    // when notes data changes, set the note text and note id states to first object in notesdata array
    // if no notes data, data post an empty object to notesData array  
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
                // Set the note_id in the state to assign id to note section
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
            // Initiate the putNote function if noteText is not empty and noteId is not null 1 second after state has updated 
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                putNote();
            }, 1000);
        }
    }, [noteText, noteId]);

    // set noteText state on user input 
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