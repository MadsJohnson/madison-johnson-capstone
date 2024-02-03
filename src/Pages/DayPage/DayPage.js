import { useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Schedule from '../../Components/Schedule/Schedule.js';
import './DayPage.scss';
import ToDoList from '../../Components/ToDoList/ToDoList.js';
import Notes from '../../Components/Notes/Notes.js'
import { baseUrl } from '../../utils.js';
import axios from 'axios';
import MainNav from '../../Components/MainNav/MainNav.js'


function DayPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { date } = useParams();
  const token = sessionStorage.token
  const [agendaData, setAgendaData] = useState(null);
  const [todoData, setTodoData] = useState(null);
  // const [prioritiesData, setPrioritiesData] = useState(null);
  const [notesData, setNotesData] = useState(null) 

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

  // const fetchPrioritiesData = () => {
  //   axios.get(`${baseUrl}/priorities?date=${date}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       setPrioritiesData(response.data);

  //     })
  //     .catch((error) => {
  //       console.log("Error fetching agenda data:", error);
  //     });
  // };

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
    // fetchPrioritiesData();
    fetchToDoData();
    fetchNotesData();

    setIsLoading(false);

  }, [date]);

  console.log("agenda data", agendaData)
  // console.log("priorties data", prioritiesData)
  console.log("todo data", todoData)
  console.log("notes data", notesData)
  console.log(token)



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
      <MainNav date={date}/>
      <div className='daypage__planner'>
        {dates.map((dateObject, index) => {
          const formattedDate = formatDateForComparison(dateObject.toISOString());
          if (formattedDate.toISOString() === new Date(date).toISOString()) {
            return (
              <div className='daypage__planner--cover' key={index}>
                <h1 className='daypage__planner--title'>{formatDateForDisplay(dateObject)}</h1>
                <div className="daypage__content-container">
                  <div className="daypage__schedule">
                    <Schedule agendaData={agendaData} date={date} baseUrl={baseUrl} />
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
        })}
       
      </div>
    </div>
  );
}

export default DayPage;
