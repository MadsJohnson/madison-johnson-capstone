import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { signupUrl } from '../../utils';
import './SignUp.scss'

const Signup = () => {
    const navigate = useNavigate();
    const [isSignupError, setIsSignupError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        const username = e.target.username ? e.target.username.value : '';
        const password = e.target.password ? e.target.password.value : '';
        const name = e.target.name ? e.target.name.value : '';

        if (!username || !password || !name) {
            setLoading(false);
            // Handle validation error
            return;
        }

        try {
            await axios.post(signupUrl, { username, password, name });

            setLoading(false);
            // Redirect to Login page
            navigate('/');
        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false);
            setErrorMessage(error.response?.data?.error?.message || 'Unknown error occurred');
        }
    };


    return (
        <div className="signupPage">
            <h1 className="signupPage__title">Signup for a Daily Plan account</h1>
            {isSignupError && <label style={{ color: "red" }}>{errorMessage}</label>}
            <div className="signupPage__form-container">
                <form className="signupPage__form" onSubmit={handleSignup}>
                    <div className="signupPage__form-group">
                        <label className="signupPage__form-group--subtitle" htmlFor="name">Name:</label>
                        <input className="signupPage__form-group--input" type="text" id="name" name="name" placeholder='name'/>
                    </div>
                    <div className="signupPage__form-group">
                        <label  className="signupPage__form-group--subtitle" htmlFor="username">Username:</label>
                        <input className="signupPage__form-group--input"  type="text" id="username" name="username" placeholder='username' />
                    </div>
                    <div className="signupPage__form-group">
                        <label className="signupPage__form-group--subtitle" htmlFor="password">Password:</label>
                        <input  className="signupPage__form-group--input" type="password" id="password" name="password" placeholder='password' />
                    </div>
                    <button className="signupPage__button" type="submit" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Signup'}
                    </button>
                </form>
                <div className="signupPage__signup">
                    <p className="signupPage__copy" >Already have an account?</p>
                    <Link to="/" className="btn btn-primary">
                        <button className="signupPage__button">Login</button>
                       
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
