import "./loginFormPages.scss"
import LogoImage from "../../logo/logo-compact-finkiopendesk-500x250.png";

const ConfirmPage = () => {
    return (
        <div className="login-page">
            <div className="card">
                <img src={LogoImage} alt="finkiopendesk_compact_icon_long_large" width={250} height={125}/>
                <h1>Your application was successful!</h1>
                <br/>
                <p>Check your mail account for an activation link.</p>
            </div>
        </div>
    );
};

export default ConfirmPage;
