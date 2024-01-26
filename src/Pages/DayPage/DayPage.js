import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Schedule from '../../Components/Schedule/Schedule.js';
import './DayPage.scss';
import Priorities from '../../Components/Priorities/Priorities.js';
import ToDoList from '../../Components/ToDoList/ToDoList.js';
import Notes from '../../Components/Notes/Notes.js'

function DayPage() {
  const { date } = useParams();
  console.log('date:', date);

  const formatDateForDisplay = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateForComparison = (dateString) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(8, 10);
    return new Date(`${year}-${month}-${day}`);
  };

  const generateDates = () => {
    const startDate = new Date('January 01, 2024');
    const endDate = new Date('December 31, 2024');
    const dates = [];

    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dates = generateDates();
  const isValidDate = dates.some(dateObject => formatDateForComparison(dateObject.toISOString()).toISOString() === new Date(date).toISOString());

  if (!isValidDate) {
    return <Navigate to="/mainpage" />;
  }

  return (
    <div className='daypage'>
      <div className='daypage__planner'>
        {dates.map((dateObject, index) => {
          const formattedDate = formatDateForComparison(dateObject.toISOString());

          if (formattedDate.toISOString() === new Date(date).toISOString()) {
            return (
              <div className='daypage__planner--cover' key={index}>
                <h1 className='daypage__planner--title'>{formatDateForDisplay(dateObject)}</h1>
                <div className="daypage__content-container">
                  <div className="daypage__priorities--mobile">
                    <Priorities />
                  </div>
                  <div className="daypage__schedule">
                    <Schedule />
                  </div>
                  <div className="daypage__subcontainer">
                    <div className="daypage__priorities--tablet">
                      <Priorities />
                    </div>
                    <ToDoList />
                    <Notes />
                  </div>


                </div>

              </div>
            );
          }

          return null;
        })}
      </div>
    </div>
  );
}

export default DayPage;
