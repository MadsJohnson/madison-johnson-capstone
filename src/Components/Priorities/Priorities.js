import './Priorities.scss';
import React, { useState } from 'react';

const Priorities = () => {
  const [showInput, setShowInput] = useState(false);

  const handleAddPriority = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    // Handle input change here
  };

  const handleToggle = () => {
    setShowInput(!showInput);
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
            // Add onChange handler for toggling completion
          />
          <input
            className="task-list__item--input"
            // Add value and onChange handler for updating priority
            onChange={handleInputChange}
          />
          <button onClick={handleToggle}>-</button>
        </div>
      )}
    </div>
  );
};

export default Priorities;
