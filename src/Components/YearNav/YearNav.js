import './YearNav.scss';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../Assets/Icons/back-arrow.svg';
import forwardArrow from '../../Assets/Icons/forward-arrow.svg';
import { generateDates } from '../../utils'

const YearNav = ({ setShowYearNav, date }) => {
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState(1);

    // navigate to previous or next month on click 
    const handlePrevMonth = () => {
        setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    };
    const handleNextMonth = () => {
        setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    };

    // generate dates for calendar
    const dates = generateDates();
    const monthNames = dates.map((monthData) => monthData.month);

    //navigat to daypage of selected date in calendar and close calendar nav
    const handleDateClick = (date) => {
        navigate(`/day/${date}`);
        setShowYearNav(false);

    };

    return (
        <div className="year-at-a-glance">
            <div className="year-at-a-glance__container">
                <button className="year-at-a-glance__button" onClick={handlePrevMonth}>
                    <img className='year-at-a-glance__button--icon-right' src={backArrow}/>
                </button>
                <h3>{monthNames[selectedMonth - 1]}</h3>
                <button className="year-at-a-glance__button" onClick={handleNextMonth}>
                    <img  className='year-at-a-glance__button--icon-left' src={forwardArrow}/>
                </button>
            </div>
            <div className="year-at-a-glance__calendar-grid">
                {/* map tthe months  */}
                {dates.map((monthData, index) => (
                    <div key={index} className={`year-at-a-glance__month ${index === selectedMonth - 1 ? 'visible' : 'hidden'}`}>
                        <div className="year-at-a-glance__week-container">
                            {/* map the days inside of each month */}
                            {index === selectedMonth - 1 && monthData.dates.map((dayData, dayIndex) => (
                                <div key={dayIndex} className="year-at-a-glance__day" onClick={() => handleDateClick(dayData.date)}>
                                    {dayData.day !== null ? dayData.day : ''}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default YearNav;


