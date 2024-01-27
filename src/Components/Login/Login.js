import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, loginUrl } from '../../utils';

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


    const renderSignupButton = () => (
        <button className="btn btn-primary" onClick={() => setIsSignedUp(true)}>
            Signup
        </button>
    );

    return (
        <div className="App">
            <h1>Login</h1>
            {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </div>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
            </form>
            <br />
            <div>
                Don't have an account? {renderSignupButton()}
            </div>
        </div>
    );
};

export default Login;
