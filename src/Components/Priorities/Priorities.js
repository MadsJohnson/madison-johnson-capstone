import { Value } from 'sass';
import './Priorities.scss';
import React, { useState } from 'react';

const Priorities = () => {
  const [showInput, setShowInput] = useState(false);
  const [completed, setCompleted] = useState('');
  const [userInput, setUserInput] = useState('');

  const handleAddPriority = () => {
    setShowInput(true);
  };

  const handleClose = () => {
    setShowInput(false)
  }

  const handleInputChange = (value) => {
    setUserInput(value)

  };

  const handleToggle = () => {
      setCompleted(!completed);
  };

  console.log(userInput);
  console.log(completed)


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
