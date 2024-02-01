import { useEffect, useState, useRef } from "react";
import axios from "axios";

const PriorityItem = ({ fetchPrioritiesData, prioritiesData, baseUrl, date }) => {
    const [priorities, setPriorities] = useState([]);
    const [userInputs, setUserInputs] = useState({});  
    const [completedStatus, setCompletedStatus] = useState({});  
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Set the initial state for userInputs and completedStatus based on prioritiesData
        const initialUserInputs = {};
        const initialCompletedStatus = {};
    
        if (prioritiesData && prioritiesData.length > 0) {
            prioritiesData.forEach((priority) => {
                initialUserInputs[priority.priority_id] = priority.priority;
                initialCompletedStatus[priority.priority_id] = priority.completed;
            });
        }
    
        setUserInputs(initialUserInputs);
        setCompletedStatus(initialCompletedStatus);
    
        setPriorities(prioritiesData);
    }, [prioritiesData]);

    useEffect(() => {
        console.log("Mapped Priorities:", priorities);
    }, [priorities]);

    useEffect(() => {
        // Cleanup function to clear the timeout
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const deletePriority = (priority_id) => {
        const token = sessionStorage.token;

        axios
            .delete(
                `${baseUrl}/priorities/${priority_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            .then((response) => {
                console.log('Priority item delete successfully:', response.data);

                // Update state after successful deletion
                setPriorities((prevPriorities) =>
                    prevPriorities.filter((priority) => priority.priority_id !== priority_id)
                );

                // Remove user input and completed status for the deleted priority
                setUserInputs((prevUserInputs) => {
                    const { [priority_id]: deletedInput, ...restInputs } = prevUserInputs;
                    return restInputs;
                });

                setCompletedStatus((prevCompletedStatus) => {
                    const { [priority_id]: deletedStatus, ...restStatus } = prevCompletedStatus;
                    return restStatus;
                });
            })
            .catch((error) => {
                console.error('Error deleting priority item:', error);
            });
    };

    const handleDelete = (priority_id) => {
        deletePriority(priority_id);
    };

    const handleCheckboxChange = (priority_id, newCompletionStatus) => {
        setCompletedStatus((prevStatus) => ({
            ...prevStatus,
            [priority_id]: newCompletionStatus,
        }));

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            updatePriorityItem(priority_id, userInputs[priority_id] || '', newCompletionStatus);
        }, 2000);
    };

    const handleTextChange = (priority_id, newPriorityValue) => {
        setUserInputs((prevUserInputs) => ({
            ...prevUserInputs,
            [priority_id]: newPriorityValue,
        }));

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            updatePriorityItem(priority_id, newPriorityValue, completedStatus[priority_id] || '');
        }, 1000);
    };

    const updatePriorityItem = (priority_id, newPriorityValue, newCompletionStatus) => {
        const token = sessionStorage.token;

        axios
            .put(
                `${baseUrl}/priorities/${priority_id}`,
                {
                    priority: newPriorityValue,
                    date: date,
                    completed: newCompletionStatus,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                console.log('Priority item updated successfully:', response.data);
                fetchPrioritiesData();
            })
            .catch((error) => {
                console.error('Error updating priority item:', error);
            });
    };

    return (
        <div className="task-list__container">
            {console.log("Before Mapping:", priorities)}
            {priorities && priorities.length > 0 ? (
                priorities.map((priority) => (
                    <div key={priority.priority_id} className="task-list__item">
                        {console.log("Priority ID:", priority.priority_id)}
                        {console.log("Completed:", priority.completed)}
                        {console.log("Priority:", priority.priority)}
                        <input
                            type="checkbox"
                            className="task-list__item--radial-toggle"
                            checked={completedStatus[priority.priority_id] || false}
                            onChange={(e) => handleCheckboxChange(priority.priority_id, e.target.checked)}
                        />
                        <input
                            type="text"
                            value={userInputs[priority.priority_id] || ''}
                            className="task-list__item--input"
                            onChange={(e) => handleTextChange(priority.priority_id, e.target.value)}
                        />
                        <button onClick={() => handleDelete(priority.priority_id)} className="task-list__button">-</button>
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default PriorityItem;
