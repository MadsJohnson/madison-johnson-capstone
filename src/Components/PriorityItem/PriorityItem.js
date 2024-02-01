import { useEffect, useState } from "react";
import axios from "axios";

const PriorityItem = ({ prioritiesData, baseUrl }) => {
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        setPriorities(prioritiesData);
    }, [prioritiesData]);

    useEffect(() => {
        console.log("Mapped Priorities:", priorities);
    }, [priorities]);

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


            })
            .catch((error) => {
                console.error('Error deleting priority item:', error);
            });
    };

    const handleDelete = (priority_id) => {
        deletePriority(priority_id);

    }



    return (
        <div>
            {console.log("Before Mapping:", priorities)}
            {priorities && priorities.length > 0 ? (
                priorities
                    .map((priority) => (
                        <div key={priority.priority_id} className="task-list__item">
                            {console.log("Priority ID:", priority.priority_id)}
                            {console.log("Completed:", priority.completed)}
                            {console.log("Priority:", priority.priority)}
                            <input
                                type="checkbox"
                                className="task-list__item--radial-toggle"
                                checked={priority.completed}
                            />
                            <input
                                type="text"
                                value={priority.priority}
                                className="task-list__item--input"
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