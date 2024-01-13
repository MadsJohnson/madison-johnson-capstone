import './WeekNav.scss';
import { Link } from 'react-router-dom';

function WeekNav() {
    const weeks = [
        'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'
    ];

    return (
        <div className='month-nav'>
            {weeks.map((week, index) => (
                <Link key={index} className='week-nav__link' to={`/month/${index + 1}`}>
                    <div className='week-nav__container'>
                        <h2 className='week-nav__header'>{week}</h2>
                    </div>

                </Link>
            ))}
        </div>
    );
};

export default WeekNav;