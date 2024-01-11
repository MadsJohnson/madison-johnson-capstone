import './MonthNav.scss';
import { Link } from 'react-router-dom';

function MonthNav() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
        <div className='month-nav'>
            {months.map((month, index) => (
                <Link key={index} className='month-nav__link' to={`/${month.toLowerCase()}`}>
                    <div className='month-nav__container'>
                        <h2 className='month-nav__header'>{month}</h2>
                    </div>

                </Link>
            ))}
        </div>
    );
};

export default MonthNav;