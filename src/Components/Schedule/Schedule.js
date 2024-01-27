import './Schedule.scss'

import { useState, useEffect } from 'react';

const Schedule = ({ agendaData, date }) => {
    const [filteredAgenda, setFilteredAgenda] = useState([]);

    // Initialize state to store schedule data
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


    useEffect(() => {
        if (agendaData && date) {
            console.log('Provided Date:', date);

            // Filter agenda items based on the provided date
            const filteredItems = agendaData.filter(item => item.date === date);
            console.log('Filtered Items:', filteredItems);

            // Initialize a copy of the initial schedule
            const updatedSchedule = { ...initialSchedule };

            // Update the schedule with the filtered agenda items
            filteredItems.forEach(item => {
                const { time, task } = item;

                // Remove leading "0:" and trailing ":00" from the time
                const cleanedTime = time.replace(/^0:/, '').replace(/^0/, '').replace(/:00$/, '');

                // Use the cleaned time as the key in the schedule
                updatedSchedule[cleanedTime] = task;
            });

            setSchedule(updatedSchedule);
        }
    }, [agendaData, date]);

    console.log(schedule)


    // Handle text input change
    const handleInputChange = (time, value) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [time]: value,
        }));
    };

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
                                    onChange={(e) => handleInputChange(time, e.target.value)}
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
