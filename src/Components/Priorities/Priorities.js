import './Priorities.scss';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Priorities = ({ prioritiesData, date, baseUrl }) => {
  const [priorities, setPriorities] = useState([
    { priority: '', completed: false },
    { priority: '', completed: false },
    { priority: '', completed: false },
    { priority: '', completed: false },
  ]);

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
  
  console.log(priorities)

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
      <h2 className="task-list__title">Priorities</h2>
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
