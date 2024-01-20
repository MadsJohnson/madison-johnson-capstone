import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DayEventCalendar from '../DayEventCalendar/DayEventCalendar';
import './MonthEventCalendar.scss'

function MonthEventCalendar() {

    const { month } = useParams();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentDate, setCurrentDate] = useState(new Date()); // Current month and year
    const [daysOfMonth, setDaysOfMonth] = useState([]);
    const [startDay, setStartDay] = useState(0);



    useEffect(() => {
        // Function to get number of days in a specific month and start day
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

        // Calculate the starting day of the week for the first day of the month
        const firstDayOfMonth = new Date(currentYear, monthIndex, 1);
        const startDayIndex = firstDayOfMonth.getDay();
        setStartDay(startDayIndex);

        // console.log(daysArray)
        // console.log(startDayIndex)

    }, [currentDate, month]);

    // // Generate empty placeholders for days before the startDay
    // const emptyDays = new Array(startDay).fill(null);

    return (
        <div className="calendar">
            <h1 className="calendar__header">{month}</h1>
            <div className="calendar__container">
                {dayNames.map((day) => (
                    <div key={day} className="calendar__subheader">
                        {day}
                    </div>
                ))}
                {/* {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="calendar__day"></div>
                ))} */}
                {daysOfMonth.length > 0 &&
                    daysOfMonth.map((day) => (
                        <div className="calendar__day" >
                            <DayEventCalendar key={day} date={day} />
                        </div>
                    ))}

            </div>

        </div>
    )
}

export default MonthEventCalendar;