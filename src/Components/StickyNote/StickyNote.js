import React, { useState, useEffect, useRef } from 'react';
import './StickyNote.scss';
import axios from 'axios';
import closeIcon from '../../Assets/Icons/close-icon.svg';

const StickyNote = ({ noteId: propNoteId, isNewStickyNote, noteTitle: propNoteTitle, noteText: propNoteText, handleCloseStickyNote, date, baseUrl }) => {
    const [localNoteText, setLocalNoteText] = useState('');
    const [localNoteId, setLocalNoteId] = useState(null);
    const [localNoteTitle, setLocalNoteTitle] = useState('');
    const timerRef = useRef(null);

    useEffect(() => {
        if (isNewStickyNote) {
            // Initialize state for a new Sticky Note
            setLocalNoteText('');
            setLocalNoteId(null);
            setLocalNoteTitle('');
        } else {
            // Update with the passed values for pre-existing notes
            setLocalNoteText(propNoteText);
            setLocalNoteId(propNoteId);
            setLocalNoteTitle(propNoteTitle);
        }
    }, [isNewStickyNote, propNoteText, propNoteId, propNoteTitle]);
    

    useEffect(() => {
        console.log("isNewStickyNote:", isNewStickyNote);
        console.log("propNoteText:", propNoteText);
        console.log("propNoteId:", propNoteId);
        console.log("propNoteTitle:", propNoteTitle);
    }, [isNewStickyNote, propNoteText, propNoteId, propNoteTitle]);
    

    const postNote = () => {
        const token = sessionStorage.token;
        axios.post(
            `${baseUrl}/notes`,
            {
                note: localNoteText,
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
                setLocalNoteId(response.data.note_id);
            })
            .catch(error => {
                console.error('Error posting note :', error);
            });
    };

    const putNote = () => {
        const token = sessionStorage.token;
        axios
            .put(
                `${baseUrl}/notes/${localNoteId}`,
                {
                    note: localNoteText,
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

    const handleInputChange = event => {
        setLocalNoteText(event.target.value);
    };

    const handleClose = () => {
        handleCloseStickyNote();
    };

    return (
        <div>
            {/* Overlay */}
            <div className="sticky-note-overlay" onClick={handleClose}></div>

            {/* Sticky Note Content */}
            <div className="sticky-note">
                <button className="sticky-note__close-button" onClick={handleClose}>
                    <img className="sticky-note__close-icon" src={closeIcon} alt="Close" />
                </button>
                <div className="sticky-note__title">
                    <input
                        className="sticky-note__title--input"
                        type="text"
                        placeholder="Title"
                        value={localNoteTitle}
                        onChange={(event) => setLocalNoteTitle(event.target.value)}
                    />
                </div>
                <div className="sticky-note__content">
                    <textarea
                        placeholder="Write something..."
                        value={localNoteText}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default StickyNote;


