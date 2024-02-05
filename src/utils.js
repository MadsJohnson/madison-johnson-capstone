
import axios from "axios";

export const baseUrl = "http://localhost:8080";

export const loginUrl = `${baseUrl}/login`;

export const signupUrl = `${baseUrl}/signup`;

export const fetchUserProfile = (token) => {

  return axios.get(`${baseUrl}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const generateDates = () => {
  const currentYear = 2024;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
  // map over each month name and initialize an empty array to store day and date objects for each month
  return monthNames.map((month, index) => {
    const monthDates = [];

    //calculate the number of days in the current month (index + 1 represents the month after intended index, 
    //setting day 0 gives the day before start of index + 1 which is the last day of index)
    const daysInMonth = new Date(currentYear, index + 1, 0).getDate(); 

    //find day 1 of index for current year
    const firstDay = new Date(currentYear, index, 1).getDay(); 

    // Push empty "boxes" for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      monthDates.push({ day: null, date: null });

    }
    // Push date for each day of the month to monthDates object 
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${currentYear}-${(index + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      monthDates.push({ day, date });
    }
    
    // returns object for each month containing two propreties: month & dates 
    return { month, dates: monthDates };
  });
};


