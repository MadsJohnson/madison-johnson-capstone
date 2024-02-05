import "./HomePage.scss";
import Login from "../../Components/Login/Login";
import backgruondVideo from '../../Assets/Videos/background-galaxy.mp4'

function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage__video-background">
                <video className="homepage__video" autoPlay loop muted>
                    <source src={backgruondVideo} type="video/mp4" />
                </video>
            </div>
            <Login className="homepage__login" />

        </div>

    );
}

export default HomePage;




