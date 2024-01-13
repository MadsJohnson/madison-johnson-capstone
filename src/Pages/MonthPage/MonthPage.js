import MonthEventCalendar from '../../Components/MonthEventCalendar/MonthEventCalendar'
import WeekOfMonthNav from '../../Components/WeekOfMonthNav/WeekOfMonthNav';
import './MonthPage.scss'


function MonthPage() {

    return (
        <div className='month-page'>
            <div className='month-page__planner'>
                <div className='month-page__planner--page'>
                  <MonthEventCalendar /
                </div>
                <WeekOfMonthNav/>
                
            </div>  

        </div>

    )
}

export default MonthPage;