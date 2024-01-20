import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute';
import './App.scss';
import MainPage from './Pages/MainPage/MainPage'
import MonthPage from './Pages/MonthPage/MonthPage'
import WeekPage from './Pages/WeekPage/WeekPage'
import DayPage from './Pages/DayPage/DayPage'
import HomePage from './Pages/HomePage/HomePage';
import Login from './Components/Login/Login';

function App() {

  // const isAuthenticated = () => {
  //   // Retrieve the JWT token from sessionStorage
  //   const token = sessionStorage.getItem('JWTtoken');

  //   // Check if the token exists and is not expired
  //   return !!token;
  // };
  return (
    <div className="App">

<BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} /> 
            <Route exact path='/home' element={<MainPage />}  />
            <Route exact path="/:month" element={<MonthPage />} />
            <Route exact path="/:month/:week" element={<WeekPage />}/>
            <Route exact path="/:month/:week/:day" element={<DayPage />} />
        </Routes>
      </BrowserRouter>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<MainPage />} isAuthenticated={isAuthenticated} />
          </Route>
          <Route exact path="/:month" element={<PrivateRoute />}>
            <Route exact path="/:month" element={<MonthPage />} isAuthenticated={isAuthenticated} />
          </Route>
          <Route exact path="/:month/:week" element={<PrivateRoute />}>
            <Route exact path="/:month/:week" element={<WeekPage />} isAuthenticated={isAuthenticated} />
          </Route>
          <Route  exact path="/:month/:week/:day" element={<PrivateRoute />}>
            <Route exact path="/:month/:week/:day" element={<DayPage />} isAuthenticated={isAuthenticated} />
          </Route>

        </Routes>
      </BrowserRouter> */}
    </div>
  );
}

export default App;
