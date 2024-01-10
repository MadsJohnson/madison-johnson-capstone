import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import MainPage from './Pages/MainPage/MainPage'
import MonthPage from './Pages/MonthPage/MonthPage'
import WeekPage from './Pages/WeekPage/WeekPage'
import DayPage from './Pages/DayPage/DayPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/:month" element={<MonthPage/>}/>
          <Route path="/:month/:week" element={<WeekPage/>}/>
          <Route path="/:month/:week/:day" element={<DayPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
