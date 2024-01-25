// Import necessary modules and styles
import './ToDoList.scss';
import { useState } from 'react';

const ToDoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
    { id: 3, text: 'Task 3', completed: false },
    { id: 4, text: 'Task 4', completed: false }, 
    { id: 5, text: 'Task 4', completed: false },
    { id: 6, text: 'Task 4', completed: false } 
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
    <div className="todo-list">
      <h2 className="todo-list__title">To Do</h2>
      {tasks.map((task) => (
        <div key={task.id} className="todo-list__item">
          <input
            type="radio"
            className="todo-list__item--radial-toggle"
            onClick={() => toggleComplete(task.id)}
            checked={task.completed}
          />
          <input
            className="todo-list__item--input"
            value={task.text}
            onChange={(e) => handleTextChange(task.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default ToDoList;