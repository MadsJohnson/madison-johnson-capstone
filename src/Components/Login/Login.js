import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserProfile, loginUrl } from '../../utils';
import './Login.scss'

const Login = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [IsSignedUp, setIsSignedUp] = useState(false)
    const [isLoginError, setIsLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const username = e.target.username ? e.target.username.value : '';
        const password = e.target.password ? e.target.password.value : '';

        if (!username || !password) {
            setLoading(false);
            // Handle validation error
            return;
        }

        try {
            const response = await axios.post(loginUrl, { username, password });
            const token = response.data.token;
            console.log('login page:', token)

            //Fetch user profile using the utility function
            const profileResponse = await fetchUserProfile(token);
            const userProfile = profileResponse.data;

            // Set user profile in sessionStorage
            sessionStorage.setItem('userProfile', JSON.stringify(userProfile));

            sessionStorage.setItem('token', JSON.stringify(token));

            setIsLoggedIn(true);
            setIsLoginError(false);
            setErrorMessage("");
            setLoading(false);

            // Redirect to MainPage
            navigate('/mainpage');
        } catch (error) {
            console.error('Login error:', error);
            setLoading(false);
            setIsLoginError(true);
            setErrorMessage(error.response?.data?.error?.message || 'Unknown error occurred');
        }
    };


    return (
        <div className="loginPage">
            <h1 className="loginPage__title">Sign in to your Daily Plan account</h1>
            {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
            <div className="loginPage__form-container">
                <form className="loginPage__form" onSubmit={handleLogin}>
                    <div className="loginPage__form-group">
                        <label className="loginPage__form-group--subtitle">Username:</label>
                        <br></br>
                        <input className="loginPage__form-group--input" type="text" id="username" name="username" placeholder="Email" />
                    </div>
                    <div className="loginPage__form-group">
                        <label htmlFor="password" className="loginPage__form-group--subtitle">Password:</label>
                        <br></br>
                        <input className="loginPage__form-group--input" type="password" id="password" name="password" placeholder="Password" />
                    </div>
                    <button className="loginPage__button" type="submit" disabled={loading}>
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                <div className="loginPage__signup">
                    <p className="loginPage__copy">Don't have an account?</p>
                    <Link to="/signup" className="btn btn-primary">
                        <button className="loginPage__button">Create an Account</button>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Login;
