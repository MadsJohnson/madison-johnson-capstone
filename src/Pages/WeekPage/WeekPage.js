import './WeekPage.scss'
import { useState, useEffect } from 'react';

const WeekPage = () => {

    const [currentWeek, setCurrentWeek] = useState(null);

    useEffect(() => {
        // Function to get the start and end dates of the current week
        const getCurrentWeekDates = () => {
            const today = new Date();
            const currentDay = today.getDay();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - currentDay); // Move to the start of the week (Sunday)
            startDate.setHours(0, 0, 0, 0);

            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 6); // Move to the end of the week (Saturday)
            endDate.setHours(23, 59, 59, 999);

            return { startDate, endDate };
        };

        // Get the current week's dates
        const { startDate, endDate } = getCurrentWeekDates();

        // Format the dates
        const formattedStartDate = startDate.toLocaleDateString();
        const formattedEndDate = endDate.toLocaleDateString();

        // Set the current week information in the state
        setCurrentWeek({ startDate: formattedStartDate, endDate: formattedEndDate });
    }, []);


    return (
        <div className='week-page'>
            <div className='week-page__planner'>
                <div className='week-page__header'>
                    {currentWeek && (
                        <>
                            <h2>{`Week of ${currentWeek.startDate} - ${currentWeek.endDate}`}</h2>
                            {/* Add any additional content or formatting as needed */}
                        </>
                    )}
                </div>
                <div className='week-page__priority-list'>
                    Priority list for each day
                </div>
                <div className='week-page__accessory-list--container'>
                    <div className='week-page__accessory-list--goals'>
                        Goals
                    </div>
                    <div className='week-page__accessory-list--notes'>
                        Notes
                    </div>
                    <div className='week-page__accessory-list--habit-tracker'>
                        Habit Tracker
                    </div>

                </div>
            </div>
        </div>
    )
}

export default WeekPage;