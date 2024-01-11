import { useParams } from 'react-router-dom';
import DayEventCalendar from '../DayEventCalendar/DayEventCalendar';
import './MonthEventCalendar.scss'

function MonthEventCalendar() {

    const { month } = useParams();

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


    return (
        <div className="calendar">
            <h1 className="calendar__header">{month}</h1>
            <div className="calendar__container">
                {dayNames.map((day) => (
                    <div key={day} className="calendar__subheader">
                        {day}
                    </div>
                ))}
                <DayEventCalendar />
            </div>

        </div>
    )
}

export default MonthEventCalendar;