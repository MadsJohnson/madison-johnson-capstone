import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../src/Components/PrivateRoute/PrivateRoute';
import './App.scss';
import DayPage from './Pages/DayPage/DayPage'
import HomePage from './Pages/HomePage/HomePage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';

function App() {

 
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route exact path='/day/:date' element={<PrivateRoute element={<DayPage/>}/> }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
