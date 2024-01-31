import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './MainNav.scss';
import YearNav from '../YearNav/YearNav';

const MainNav = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userProfile');
        navigate('/');
    }

    const goToToday = () => {
        const currentDate = new Date().toISOString().split('T')[0];
        navigate(`/day/${currentDate}`);
    }

    const [showYearNav, setShowYearNav] = useState(false);

    const handleToggleYearNav = () => {
        setShowYearNav((prevShowYearNav) => !prevShowYearNav);
    };

    return (
        <>
            <div className='main-nav'>
                <button className='main-nav__button' onClick={goToToday}>Go to today</button>
                <button className='main-nav__button' onClick={handleToggleYearNav}>Calendar</button>
                <button className='main-nav__button' onClick={handleLogout}>Logout</button>
            </div>
            {showYearNav && (
                <>
                    <div className='main-nav__overlay'> </div>
                    <YearNav setShowYearNav={setShowYearNav} className='main-nav__year-nav' />
                </>
            )}
        </>

    )
}

export default MainNav;
