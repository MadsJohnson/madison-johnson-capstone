import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DayEventCalendar from '../DayEventCalendar/DayEventCalendar';
import './MonthEventCalendar.scss'

function MonthEventCalendar() {

    const { month } = useParams();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentDate, setCurrentDate] = useState(new Date()); // Current month and year
    const [daysOfMonth, setDaysOfMonth] = useState([]);


    useEffect(() => {
        // Function to get number of days in a specific month
        function daysInMonth(year, month) {
            const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
            const daysArray = [];

            for (let day = 1; day <= lastDayOfMonth; day++) {
                daysArray.push(day);
            }

            return daysArray;
        }

        const currentYear = currentDate.getFullYear();
        const monthIndex = new Date(Date.parse(month + ' 1, ' + currentYear)).getMonth();
        const daysArray = daysInMonth(currentYear, monthIndex);
        setDaysOfMonth(daysArray);

        console.log(daysArray)

    }, [currentDate, month]);



    return (
        <div className="calendar">
            <h1 className="calendar__header">{month}</h1>
            <div className="calendar__container">
                {dayNames.map((day) => (
                    <div key={day} className="calendar__subheader">
                        {day}
                    </div>
                ))}
                {daysOfMonth.length > 0 &&
                    daysOfMonth.map((day) => (
                        <DayEventCalendar key={day} date={day} /* Other props for data, API functions */ />
                    ))}

            </div>

        </div>
    )
}

export default MonthEventCalendar;