import "./SignUpPage.scss";
import SignUp from "../../Components/SignUp/SignUp";
import backgruondVideo from '../../Assets/Videos/background-galaxy.mp4'

function SignUpPage() {
    return (
        <div className="signup-page">
            <div className="signup-page__video-background">
                <video className="signup-page__video" autoPlay loop muted>
                    <source src={backgruondVideo} type="video/mp4" />
                </video>
            </div>
            <SignUp className="signup-page__login" />

        </div>

       
    );
}

export default SignUpPage;