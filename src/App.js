import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './Pages/MainPage/MainPage'
import MonthPage from './Pages/MonthPage/MonthPage'
import WeekPage from './Pages/WeekPage/WeekPage'
import DayPage from './Pages/DayPage/DayPage'
import HomePage from './Pages/HomePage/HomePage';
import Login from './Components/Login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/:month" element={<MonthPage/>}/>
          <Route path="/:month/:week" element={<WeekPage/>}/>
          <Route path="/:month/:week/:day" element={<DayPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
