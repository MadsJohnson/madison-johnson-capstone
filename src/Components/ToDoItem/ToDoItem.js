import { useEffect, useState, useRef } from "react";
import axios from "axios";
import deleteIcon from '../../Assets/Icons/delete.svg'
import "./ToDoItem.scss";

const ToDoItem = ({ fetchToDoData, todoData, baseUrl, date }) => {
    const [todos, setTodos] = useState([]);
    const [userInputs, setUserInputs] = useState({});
    const [completedStatus, setCompletedStatus] = useState({});
    const timeoutRef = useRef(null);

    console.log(userInputs)

    useEffect(() => {
        const initialUserInputs = {};
        const initialCompletedStatus = {};

        if (todoData && todoData.length > 0) {
            todoData.forEach((todo) => {
                initialUserInputs[todo.task_id] = todo.task;
                initialCompletedStatus[todo.task_id] = todo.completed;
            });
        }

        setUserInputs(initialUserInputs);
        setCompletedStatus(initialCompletedStatus);

        setTodos(todoData);
      
    }, [todoData]);

    console.log(todoData)

    useEffect(() => {
        console.log("Mapped todos:", todos);
    }, [todos]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const deleteTodo = (task_id) => {
        const token = sessionStorage.token;

        axios
            .delete(
                `${baseUrl}/todo/${task_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((response) => {
                console.log('Todo item deleted successfully:', response.data);

                // Update state after successful deletion
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.task_id !== task_id)
                );

                // Remove user input and completed status for the deleted todo
                setUserInputs((prevUserInputs) => {
                    const { [task_id]: deletedInput, ...restInputs } = prevUserInputs;
                    return restInputs;
                });

                setCompletedStatus((prevCompletedStatus) => {
                    const { [task_id]: deletedStatus, ...restStatus } = prevCompletedStatus;
                    return restStatus;
                });
            })
            .catch((error) => {
                console.error('Error deleting todo item:', error);
            });
    };

    const handleDelete = (task_id) => {
        deleteTodo(task_id);
    };

    const handleCheckboxChange = (task_id, newCompletionStatus) => {
        setCompletedStatus((prevStatus) => ({
            ...prevStatus,
            [task_id]: newCompletionStatus,
        }));

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            updateTodoItem(task_id, userInputs[task_id] || '', newCompletionStatus);
        }, 2000);
    };

    const handleTextChange = (task_id, newTaskValue) => {
        setUserInputs((prevUserInputs) => ({
            ...prevUserInputs,
            [task_id]: newTaskValue,
        }));

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            updateTodoItem(task_id, newTaskValue, completedStatus[task_id] || '');
        }, 3000);
    };

    const updateTodoItem = (task_id, newTaskValue, newCompletionStatus) => {
        const token = sessionStorage.token;

        axios
            .put(
                `${baseUrl}/todo/${task_id}`,
                {
                    task: newTaskValue,
                    due_date: date,
                    completed: Boolean(newCompletionStatus),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log('Todo item updated successfully:', response.data);
                fetchToDoData();
            })
            .catch((error) => {
                console.error('Error updating Todo item:', error);
            });
    };

    return (
        <div className="task-list__container">
            {console.log("Before Mapping:", todos)}
            {todos && todos.length > 0 ? (
                todos.map((todo) => (
                    <div key={todo.task_id} className="task-list__item">
                        {/* {console.log("Priority ID:", priority.priority_id)}
                        {console.log("Completed:", priority.completed)}
                        {console.log("Priority:", priority.priority)} */}
                        <input
                            type="checkbox"
                            className="task-list__item--radial-toggle"
                            checked={completedStatus[todo.task_id] || false}
                            onChange={(e) => handleCheckboxChange(todo.task_id, e.target.checked)}
                        />
                        <div className={`task-list__item--input-container ${completedStatus[todo.task_id] ? 'completed' : ''}`}>
                            <input
                                type="text"
                                value={userInputs[todo.task_id] || ''}
                                className="task-list__item--input"
                                onChange={(e) => handleTextChange(todo.task_id, e.target.value)}
                            />
                        </div>
                        <button onClick={() => handleDelete(todo.task_id)} className="task-list__button">
                            <img className="task-list__icon" src={deleteIcon} />
                        </button>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default ToDoItem;