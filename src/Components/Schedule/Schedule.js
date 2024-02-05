import './Schedule.scss';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Schedule = ({ currentDate, agendaData, date, baseUrl }) => {
  const initialSchedule = {
    '6:00': '',
    '7:00': '',
    '8:00': '',
    '9:00': '',
    '10:00': '',
    '11:00': '',
    '12:00': '',
    '13:00': '',
    '14:00': '',
    '15:00': '',
    '16:00': '',
    '17:00': '',
    '18:00': '',
    '19:00': '',
    '20:00': '',
    '21:00': '',
    '22:00': '',
    '23:00': ''
  };


  const [schedule, setSchedule] = useState(initialSchedule);
  const timerRef = useRef(null);

  //update the schedule state based on changes in the agendaData prop
  useEffect(() => {
    if (agendaData && agendaData.length > 0) {
      const updatedSchedule = { ...initialSchedule };

      agendaData.forEach(item => {
        const { time, task } = item;
        //Updates the updatedSchedule object with the task assigned to the corresponding time 
        //using the time directly as the key in the schedule
        updatedSchedule[time] = task;
      });

      setSchedule(updatedSchedule);
    } else {
      // Map over the initial schedule if agendaData is empty
      setSchedule(initialSchedule);
    }
  }, [agendaData]);

  const postAgendaItem = (date, time, task) => {
    const token = sessionStorage.token;
    axios.post(
      `${baseUrl}/agenda`,
      {
        date,
        time,
        task,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        console.log('Agenda item posted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error posting agenda item:', error);
      });
  };

  const handleInputChange = (time, value) => {
    //creates a new object by spreading the previous schedule and updating the value associated with the time key 
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      [time]: value,
    }));

    // Clear the previous timer
    clearTimeout(timerRef.current);

    // Set a new timer to post the agenda item after 1 second of inactivity
    timerRef.current = setTimeout(() => {
      // Use handleAddItem to post the agenda item after 1 second of inactivity
      handleAddItem(time, value);
    }, 1000);
  };

  const handleAddItem = (newTime, newValue) => {
    // Check if agendaData is available and has a length greater than 0
    if (agendaData && agendaData.length > 0) {
      // Check if an entry with the same date and time already exists
      const existingEntry = agendaData.find(item => item.date === date && item.time === newTime);

      if (!existingEntry) {
        // Post the agenda item if it doesn't exist
        postAgendaItem(date, newTime, newValue);
      } else {
        // Update the existing agenda item if it exists
        updateAgendaItem(existingEntry.id, date, newTime, newValue);
      }
    } else {
      // If agendaData is null or empty, post the initial schedule agenda items
      postAgendaItem(date, newTime, newValue);
    }
  };


  const updateAgendaItem = (id, date, time, task) => {
    const token = sessionStorage.token;
    axios.put(
      `${baseUrl}/agenda/${id}`,
      {
        date,
        time,
        task,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(response => {
        console.log('Agenda item updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating agenda item:', error);
      });
  };

  const formattedDate = new Date(currentDate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
  


  return (
    <div className='schedule'>
      <h2 className='schedule__title'> {formattedDate}</h2>
      <table className='schedule__container'>
        <tbody className='schedule__subcontainer'>
          {Object.entries(initialSchedule).map(([time, task]) => (
            <tr className='schedule__row' key={time}>
              <td className='schedule__row--time'>{time}</td>
              <td className='schedule__row--input--container'>
                <input
                  className='schedule__row--input'
                  type="text"
                  value={schedule[time] || ''}
                  onChange={e => handleInputChange(time, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  ;
}

export default Schedule;