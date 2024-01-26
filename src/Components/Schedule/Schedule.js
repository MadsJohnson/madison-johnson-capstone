import './Schedule.scss'

import { useState } from 'react';

const Schedule = () => {
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
