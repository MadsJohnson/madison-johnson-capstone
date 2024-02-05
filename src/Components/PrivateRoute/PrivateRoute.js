import { Navigate } from "react-router-dom";

// if user tries to access routes that need authentication without token, redirect to login
const PrivateRoute = ({ element }) => {

  const Element = () => element
  const token = sessionStorage.getItem("token");
  const isAuthenticated = token && token.length > 0;

  return isAuthenticated ? <Element/> : <Navigate to="/" />


};

export default PrivateRoute;

