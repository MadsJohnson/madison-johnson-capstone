import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = () => {
    const token = sessionStorage.getItem('JWTtoken');
    return !!token;
  };

  return isAuthenticated() ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
