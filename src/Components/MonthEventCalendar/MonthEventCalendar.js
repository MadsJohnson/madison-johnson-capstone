import { useParams } from 'react-router-dom';
import DayEventCalendar from '../DayEventCalendar/DayEventCalendar';
import './MonthEventCalendar.scss'

function MonthEventCalendar() {

const {month} = useParams();

    return (
        <div className="calendar">
            <h1>{month}</h1>
            <DayEventCalendar/>
        </div>
    )
}

export default MonthEventCalendar;