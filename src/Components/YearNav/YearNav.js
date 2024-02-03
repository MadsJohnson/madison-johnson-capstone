import React, { useState } from 'react';
import './YearNav.scss';
import { useNavigate } from 'react-router-dom';
import backArrow from '../../Assets/Icons/back-arrow.svg';
import forwardArrow from '../../Assets/Icons/forward-arrow.svg';

const YearNav = ({ setShowYearNav, date }) => {
    const navigate = useNavigate();
    const currentYear = 2024;
    const months = Array.from({ length: 12 }, (_, monthIndex) => monthIndex + 1);
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [selectedMonth, setSelectedMonth] = useState(1);

    const handlePrevMonth = () => {
        setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
    };

    const handleNextMonth = () => {
        setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
    };

    const generateDates = () => {
        const monthIndex = selectedMonth - 1;

        return months.map((month, index) => {
            const monthDates = [];
            const daysInMonth = new Date(currentYear, month, 0).getDate();
            const firstDay = new Date(currentYear, month - 1, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.

            // Add empty boxes for days before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                monthDates.push({ day: null, date: null });
            }

            // Add days of the month
            for (let day = 1; day <= daysInMonth; day++) {
                const date = `${currentYear}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                monthDates.push({ day, date });
            }

            return { month: monthNames[(monthIndex + index) % 12], dates: monthDates };
        });
    };


    const dates = generateDates();

    const handleDateClick = (date) => {
        const formattedDate = new Date(date).toISOString().split('T')[0];
        navigate(`/day/${date}`);

        setShowYearNav(false);

    };

    return (
        <div className="year-at-a-glance">
            <div className="month-navigation">
                <button className="button" onClick={handlePrevMonth}>
                    <img className='button-icon-right' src={backArrow}/>
                </button>
                <h3>{monthNames[selectedMonth - 1]}</h3>
                <button className="button" onClick={handleNextMonth}>
                    <img  className='button-icon-left' src={forwardArrow}/>
                </button>
            </div>
            <div className="calendar-grid">
                {dates.map((monthData, index) => (
                    <div key={index} className={`month ${index === selectedMonth - 1 ? 'visible' : 'hidden'}`}>
                        <div className="week-container">
                            {index === selectedMonth - 1 && monthData.dates.map((dayData, dayIndex) => (
                                <div key={dayIndex} className="day" onClick={() => handleDateClick(dayData.date)}>
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


