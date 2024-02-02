import './MainPage.scss'
// import Chevron from '../../Assets/Icons/chevron.svg'
import React, { useEffect, useState } from 'react';
import { fetchUserProfile } from '../../utils';
// import { Link } from 'react-router-dom';
import MainNav from '../../Components/MainNav/MainNav';


function MainPage() {
  const userProfile = JSON.parse(sessionStorage.getItem('userProfile')) || {};
  const [isLoading, setIsLoading] = useState(true);

  const userName = userProfile.name;

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const updateProfile = (user) => {
      console.log('User Profile:', user);

      // Update userProfile state with username and name only
      const { username, name, } = user;
      const updatedProfile = { username, name };
      sessionStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    };

    if (token) {
      // Fetch user profile using the utility function
      fetchUserProfile(token)
        .then((response) => {
          const user = response.data;
          updateProfile(user);
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);





  return (
    <div className='mainpage'> {

      isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <MainNav />
          <div className='mainpage__planner'>
            <div className='mainpage__planner--cover'>
              {/* <Link to="/day/2024-01-01" className='mainpage__planner--page-turn-icon--container'>
                <img src={Chevron} className='mainpage__planner--page-turn-icon' alt='page turn icon' />
              </Link> */}
              <div className='mainpage__planner--title--container'>
                <div className='mainpage__planner--title--subcontainer'>
                  <h1 className='mainpage__planner--title'>2024</h1>
                  <p className='mainpage__planner--subtitle'>PLANNER</p>
                </div>

              </div>
            </div>
          </div>
        </>
      )
    }

    </div>
  )
}

export default MainPage;