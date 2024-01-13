import MonthEventCalendar from '../../Components/MonthEventCalendar/MonthEventCalendar'
import WeekNav from '../../Components/WeekNav/WeekNav';
import './MonthPage.scss'


function MonthPage() {

    return (
        <div className='month-page'>
            <div className='month-page__planner'>
                <MonthEventCalendar />
               
            </div>
            <WeekNav />
        </div>

    )
}

export default MonthPage;