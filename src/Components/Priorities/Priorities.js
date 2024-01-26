import './Priorities.scss';
import { useState } from 'react';

const Priorities = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false},
  ]);

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTextChange = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
  };

  return (
    <div className="task-list">
      <h2 className="task-list__title">Priorities</h2>
      {tasks.map((task) => (
        <div key={task.id} className="task-list__item">
          <input
            type="radio"
            className="task-list__item--radial-toggle"
            onClick={() => toggleComplete(task.id)}
            checked={task.completed}
          />
          <input
            className="task-list__item--input"
            value={task.text}
            onChange={(e) => handleTextChange(task.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Priorities;
