import './DayEventCalendar.scss'
import { useState } from 'react';

const DayEventCalendar =({date})=> {
  const [events, setEvents] = useState(''); 

  const handleEventInput = (event) => {
    const newEvent = event.target.value;
    setEvents(newEvent)

    console.log(events)

    //next step: POST to API to save event
  }


  return (
    <div className="calendar-day">
      <div className="calendar-day__number">{date}</div>
      <textarea
        className="calendar-day__user-input"
        placeholder="enter event here..."
        value={events}
        onChange={handleEventInput}
      />
    </div>
  );
};

export default DayEventCalendar;