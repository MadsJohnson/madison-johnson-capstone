import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute';
import './App.scss';
import MainPage from './Pages/MainPage/MainPage';
// import MonthPage from './Pages/MonthPage/MonthPage'
// import WeekPage from './Pages/WeekPage/WeekPage'
import DayPage from './Pages/DayPage/DayPage'
import HomePage from './Pages/HomePage/HomePage';
import Login from './Components/Login/Login';

function App() {

 
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route exact path='/mainpage' element={<PrivateRoute element={<MainPage/>}/> }/>
          <Route exact path='/day/:date' element={<PrivateRoute element={<DayPage/>}/> }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
