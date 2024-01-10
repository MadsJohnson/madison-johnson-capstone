import DayEventCalendar from '../DayEventCalendar/DayEventCalendar';
import './MonthEventCalendar.scss'

function MonthEventCalendar() {
    return(
        <div className='event-calendar'>
            <div>Month - Event Calendar</div>
            <DayEventCalendar/>
        </div>
        
    )
}

export default MonthEventCalendar;