import './MainPage.scss'
import Chevron from '../../Assets/Icons/chevron_right-24px.svg'

function MainPage() {

    return (
        <div className='mainpage'>
            <div className='mainpage__planner'>
                <div className='mainpage__planner--cover'>
                    <div className='mainpage__planner--page-turn-icon--container'>
                        <img src={Chevron} className='mainpage__planner--page-turn-icon'alt='page turn icon'/>
                    </div>
                    <div className='mainpage__planner--title--container'>
                        <div className='mainpage__planner--title--subcontainer'>
                            <h1 className='mainpage__planner--title'>2024</h1>
                            <p className='mainpage__planner--subtitle'>PLANNER</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage;