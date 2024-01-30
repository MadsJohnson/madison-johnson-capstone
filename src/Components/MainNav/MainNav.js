import { Link, useNavigate } from 'react-router-dom'
import './MainNav.scss'

const MainNav = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userProfile');
        
        navigate('/');
    }

    console.log()

    return (
        <div className='main-nav'>
            <button className='main-nav__button' onClick={handleLogout}>Logout</button>
            <button className='main-nav__button'>Go to today</button>
        </div>
    )
}

export default MainNav