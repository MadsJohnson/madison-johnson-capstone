import './Schedule.scss';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Schedule = ({ agendaData, date, baseUrl }) => {
    const initialSchedule = {
        '6:00': '',
        '7:00': '',
        '8:00': '',
        '9:00': '',
        '10:00': '',
        '11:00': '',
        '12:00': '',
        '13:00': '',
        '14:00': '',
        '15:00': '',
        '16:00': '',
        '17:00': '',
        '18:00': '',
        '19:00': '',
        '20:00': '',
        '21:00': '',
        '22:00': '',
        '23:00': ''
    };

    const [schedule, setSchedule] = useState(initialSchedule);

    // Use useRef to keep track of the timer
    const timerRef = useRef(null);

    useEffect(() => {
        if (agendaData && date) {
            const filteredItems = agendaData.filter(item => item.date === date);
            const updatedSchedule = { ...initialSchedule };

            filteredItems.forEach(item => {
                const { time, task } = item;
                // Use the time directly as the key in the schedule
                updatedSchedule[time] = task;
            });

            setSchedule(updatedSchedule);
        }
    }, [agendaData, date]);

    const postAgendaItem = (date, time, task) => {
        const token = sessionStorage.token;
        axios.post(
            `${baseUrl}/agenda`,
            {
                date,
                time,
                task,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                console.log('Agenda item posted successfully:', response.data);
            })
            .catch(error => {
                console.error('Error posting agenda item:', error);
            });
    };

    const handleInputChange = (time, value) => {
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [time]: value,
        }));

        // Clear the previous timer
        clearTimeout(timerRef.current);

        // Set a new timer to post the agenda item after 5 seconds of inactivity
        timerRef.current = setTimeout(() => {
            // Use handleAddItem to post the agenda item after 5 seconds of inactivity
            handleAddItem(time, value);
        }, 1000);
    };

    const handleAddItem = (newTime, newValue) => {
        // Check if an entry with the same date and time already exists
        const existingEntry = agendaData.find(item => item.date === date && item.time === newTime);

        if (!existingEntry) {
            // Post the agenda item if it doesn't exist
            postAgendaItem(date, newTime, newValue);
        } else {
            // Update the existing agenda item if it exists
            updateAgendaItem(existingEntry.id, date, newTime, newValue);
        }
    };

    const updateAgendaItem = (id, date, time, task) => {
        const token = sessionStorage.token;
        axios.put(
            `${baseUrl}/agenda/${id}`,
            {
                date,
                time,
                task,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                console.log('Agenda item updated successfully:', response.data);
            })
            .catch(error => {
                console.error('Error updating agenda item:', error);
            });
    };
    
    console.log(schedule)

    return (
        <div className='schedule'>
            <h2 className='schedule__title'>Schedule</h2>
            <table className='schedule__container'>
                <tbody className='schedule__subcontainer'>
                    {Object.entries(schedule).map(([time, task]) => (
                        <tr className='schedule__row' key={time}>
                            <td className='schedule__row--time'>{time}</td>
                            <td className='schedule__row--input--container'>
                                <input
                                    className='schedule__row--input'
                                    type="text"
                                    value={task}
                                    onChange={e => handleInputChange(time, e.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
