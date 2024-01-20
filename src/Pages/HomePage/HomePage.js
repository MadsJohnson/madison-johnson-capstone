import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.scss";

function HomePage() {
    return (
        <div className="homepage">
            <button className="homepage__button">
                < Link to="/signup" className="homepage__link">Sign Up</Link>
            </button>
            <button className="homepage__button">
                <Link to="/login" className="homepage__link">Login</Link>
            </button>

        </div>
    );
}

export default HomePage;




