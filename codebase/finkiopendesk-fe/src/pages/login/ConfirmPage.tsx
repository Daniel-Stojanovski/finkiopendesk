import "./loginFormPages.scss"

const ConfirmPage = () => {
    return (
        <div className="login-page">
            <div className="card">
                <img src={"./src/logo/logo-compact-finkiopendesk-500x250.png"} width={250} height={125}/>
                <h1>Your application was successful!</h1>
                <br/>
                <p>Check your mail account for an activation link.</p>
            </div>
        </div>
    );
};

export default ConfirmPage;
