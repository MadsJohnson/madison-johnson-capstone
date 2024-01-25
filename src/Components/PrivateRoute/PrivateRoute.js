import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {

  const Element = () => element
  const isAuthenticated = sessionStorage.getItem("token").length > 0;

  return isAuthenticated ? <Element/> : <Navigate to="/login" />



};

export default PrivateRoute;

