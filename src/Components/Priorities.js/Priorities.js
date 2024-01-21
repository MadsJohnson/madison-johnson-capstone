import './Priorities.js'
import { useState } from 'react';

const Priorities = () => {
    const [tasks, setTasks] = useState([
      { id: 1, text: 'Task 1', completed: false },
      { id: 2, text: 'Task 2', completed: true },
      { id: 3, text: 'Task 3', completed: false },
    ]);
  
    const toggleComplete = (taskId) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    };
  
    return (
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            <div
              className={`checkbox ${task.completed ? 'checked' : ''}`}
              onClick={() => toggleComplete(task.id)}
            ></div>
            <div className="task-text">{task.text}</div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Priorities;