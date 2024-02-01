import './Priorities.scss';
import React, { useState, useRef } from 'react';
import axios from 'axios';

const Priorities = ({ baseUrl, date }) => {
  const [showInput, setShowInput] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [userInput, setUserInput] = useState('');
  const timeoutRef = useRef(null);

  const handleAddPriority = () => {
    setShowInput(true);
  };

  const handleClose = () => {
    setShowInput(false);
    clearTimeout(timeoutRef.current);
    setUserInput('');
    setCompleted(false);
  };

  const handleInputChange = (value) => {
    setUserInput(value);

    // Clear the previous timeout (if any)
    clearTimeout(timeoutRef.current);

    // Set a new timeout to call postPriorityItem after 2000 milliseconds (2 seconds)
    timeoutRef.current = setTimeout(() => {
      postPriorityItem();
    }, 2000);
  };

  const handleToggle = () => {
    setCompleted(!completed);
  };

  const postPriorityItem = () => {
    const token = sessionStorage.token;

    axios
      .post(
        `${baseUrl}/priorities`,
        {
          priority: userInput,
          due_date: date,
          completed: completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Priority item posted successfully:', response.data);
        setShowInput(false);
        setUserInput('');
        setCompleted(false);
      })
      .catch((error) => {
        console.error('Error posting priority item:', error);
      });
  };

  return (
    <div className="task-list">
      <div className='task-list__title-container'>
        <h2 className="task-list__title">Priorities</h2>
        <button className="task-list__button" onClick={handleAddPriority}>+</button>
      </div>
      {showInput && (
        <div className="task-list__item">
          <input
            type="checkbox"
            className="task-list__item--radial-toggle"
            onClick={handleToggle}
            checked={completed}
          />
          <input
            className="task-list__item--input"
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button onClick={handleClose}>-</button>
        </div>
      )}
    </div>
  );
};

export default Priorities;
