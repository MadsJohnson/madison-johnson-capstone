// PriorityItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PriorityItem = ({ priority, index, date, baseUrl, onDelete }) => {
    const [completed, setCompleted] = useState(priority.completed);
    const [userInput, setUserInput] = useState(priority.priority);

    useEffect(() => {
        // Use a timeout to post the data after 1000 milliseconds (1 second)
        const timeoutId = setTimeout(() => {
            putPriorityItem();
            setShowInput(false);
        }, 1000);

        return () => clearTimeout(timeoutId); // Clear timeout on component unmount
    }, [userInput, completed]);

    const handleInputChange = (value) => {
        setUserInput(value);
    };

    const handleToggle = () => {
        setCompleted(!completed);
    };

    const handleDelete = () => {
        onDelete(index);
    };

    return (
        <div className="task-list__item">
            <input
                type="checkbox"
                className="task-list__item--radial-toggle"
                onChange={handleToggle}
                checked={completed} />
            <input
                className="task-list__item--input"
                value={userInput}
                onChange={(e) => handleInputChange(e.target.value)} />
            <button
                className="task-list__item--delete-button"
                onClick={handleDelete}>
                -
            </button>
        </div >
    );
};

export default PriorityItem;
