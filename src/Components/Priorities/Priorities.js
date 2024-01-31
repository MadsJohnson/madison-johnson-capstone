import './Priorities.scss';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Priorities = ({ prioritiesData, date, baseUrl }) => {
  const [priorities, setPriorities] = useState(prioritiesData || []);

  const handleInputChange = (index, value) => {
    setPriorities((prevPriorities) => {
      const updatedPriorities = [...prevPriorities];
      updatedPriorities[index] = {
        ...updatedPriorities[index],
        priority: value,
      };
      return updatedPriorities;
    });
  };

  const handleToggle = (index) => {
    setPriorities((prevPriorities) => {
      const updatedPriorities = [...prevPriorities];
      updatedPriorities[index] = {
        ...updatedPriorities[index],
        completed: !updatedPriorities[index].completed,
      };
      return updatedPriorities;
    });
  };

  const handleAddPriority = () => {
    setPriorities((prevPriorities) => [...prevPriorities, { priority: '', completed: false }]);
  };

  const postPriorityItem = (priority) => {
    const token = sessionStorage.token;
    axios
      .post(
        `${baseUrl}/priorities`,
        {
          priority: priority.priority,
          due_date: date,
          completed: priority.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Priority item posted successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error posting priority item:', error);
      });
  };

  const updatePriorityItem = (id, priority) => {
    const token = sessionStorage.token;
    axios
      .put(
        `${baseUrl}/priorities/${id}`,
        {
          priority: priority.priority,
          due_date: date,
          completed: priority.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('Priority item updated successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error updating priority item:', error);
      });
  };
  return (
    <div className="task-list">
      <div className='task-list__title-container'>
        <h2 className="task-list__title">Priorities</h2>
        <button className="task-list__button" onClick={handleAddPriority}>+</button>
      </div>
      {priorities.map((priority, index) => (
        <div key={index} className="task-list__item">
          <input
            type="checkbox"
            className="task-list__item--radial-toggle"
            onChange={() => handleToggle(index)}
            checked={priority.completed}
          />
          <input
            className="task-list__item--input"
            value={priority.priority}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Priorities;
