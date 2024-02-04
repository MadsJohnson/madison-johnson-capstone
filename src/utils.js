
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

export const formatDateForDisplay = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

