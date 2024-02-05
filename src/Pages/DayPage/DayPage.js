import './DayPage.scss';
import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { baseUrl, generateDates } from '../../utils.js';
import Schedule from '../../Components/Schedule/Schedule.js';
import ToDoList from '../../Components/ToDoList/ToDoList.js';
import Notes from '../../Components/Notes/Notes.js';
import MainNav from '../../Components/MainNav/MainNav.js';
import axios from 'axios';


function DayPage() {
  const { date } = useParams();
  const [agendaData, setAgendaData] = useState(null);
  const [todoData, setTodoData] = useState(null);
  const [notesData, setNotesData] = useState(null)
  const token = sessionStorage.token
  const today = new Date().toISOString().split('T')[0];

  const fetchAgendaData = () => {
    axios.get(`${baseUrl}/agenda?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setAgendaData(response.data);

      })
      .catch((error) => {
        console.log("Error fetching agenda data:", error);
      });
  };

  const fetchToDoData = () => {
    axios.get(`${baseUrl}/todo?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTodoData(response.data);

      })
      .catch((error) => {
        console.log("Error fetching todo data:", error);
      });
  };

  const fetchNotesData = () => {
    axios.get(`${baseUrl}/notes?date=${date}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setNotesData(response.data);

      })
      .catch((error) => {
        console.log("Error fetching agenda data:", error);
      });
  };

  useEffect(() => {
    fetchAgendaData();
    fetchToDoData();
    fetchNotesData();
  }, [date]);


  const dates = generateDates();

  const isValidDate = dates.some(monthObject =>
    monthObject.dates.some(dateObject =>
      dateObject.date === date
    )
  );

  if (!isValidDate) {
    return <Navigate to={`/day/${today}`} />;
  }

  return (
    <div className='daypage'>
      <MainNav date={date} />
      <div className='daypage__planner'>
        {dates.map((monthObject, monthIndex) => {
          return monthObject.dates && monthObject.dates.map((dateObject, dateIndex) => {
            const formattedDate = new Date(dateObject.date);
            if (formattedDate.toISOString() === new Date(date).toISOString()) {
              return (
                <div className='daypage__planner--cover' key={`${monthIndex}-${dateIndex}`}>
                  <div className="daypage__content-container">
                    <div className="daypage__schedule">
                      <Schedule currentDate={formattedDate} agendaData={agendaData} date={date} baseUrl={baseUrl} />
                    </div>
                    <div className="daypage__subcontainer">
                      <ToDoList todoData={todoData} fetchToDoData={fetchToDoData} date={date} baseUrl={baseUrl} />
                      <Notes notesData={notesData} date={date} baseUrl={baseUrl} />
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          });
        })}

      </div>
    </div>
  );
}

export default DayPage;
