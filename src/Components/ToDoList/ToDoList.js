import './ToDoList.scss';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import addIcon from '../../Assets/Icons/add.svg'
import deleteIcon from '../../Assets/Icons/delete.svg'
import ToDoItem from '../ToDoItem/ToDoItem';

const ToDoList = ({ fetchToDoData, todoData, baseUrl, date }) => {
  const [showInput, setShowInput] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [userInput, setUserInput] = useState('');

  const timeoutRef = useRef(null);

  // show input add div on click
  const handleAddTodo = () => {
    setShowInput(true);
  };

  //remove input add div on cancel click
  const handleClose = () => {
    setShowInput(false);
    clearTimeout(timeoutRef.current);
    setUserInput('');
    setCompleted(false);

  };

  const handleInputChange = (value) => {
    //update user input state  
    setUserInput(value);

    // Clear timeout and set a new timeout to to delay postTodoItem by 1 second after user inactivity stops
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      postTodoItem();
    }, 1000);
  };


  // toggle completed status on click
  const handleToggle = () => {
    setCompleted(!completed);
  };

  const postTodoItem = () => {
    const token = sessionStorage.token;

    axios
      .post(
        `${baseUrl}/todo`,
        {
          task: userInput,
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
        console.log('Todo item posted successfully:', response.data);
        setShowInput(false);
        setUserInput('');
        setCompleted(false);
        fetchToDoData();

      })
      .catch((error) => {
        console.error('Error posting Todo item:', error);
      });
  };


  return (
    <div className="task-list">
      <div className='task-list__title-container'>
        <h2 className="task-list__title">To Do</h2>
        <button className="task-list__button" onClick={handleAddTodo}>
          <img alt="add icon" className="task-list__icon" src={addIcon} />
        </button>
      </div>
      <div className='task-list__container'>
        {showInput && (
          <div className="task-list__item">
            <input
              type="checkbox"
              className="task-list__item--radial-toggle"
              onChange={handleToggle}
              checked={completed}
            />
            <div className="task-list__item--input-container">
              <input
                className="task-list__item--input"
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </div>
            <button className="task-list__button" onClick={handleClose}>
              <img alt="delete icon" className="task-list__icon" src={deleteIcon} />
            </button>
          </div>
        )}
      </div>
      <ToDoItem fetchToDoData={fetchToDoData} baseUrl={baseUrl} todoData={todoData} date={date} />
    </div>
  );
};

export default ToDoList;