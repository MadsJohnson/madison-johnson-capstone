import './DayEventCalendar.scss'

function DayEventCalendar() {

  return (
    <div className="calendar-day">
      <div className="calendar-day__number">DAY #</div>
      <textarea
        className="calendar-day__user-input"
        placeholder=""
      />
    </div>
  );
};

export default DayEventCalendar;