import "./quickScrollButton.scss"

const QuickScrollButton = ({ targetSection }) => {
    return (
        <div id="utility-button">
            <a href={`#${targetSection}`}>
                Go to {targetSection}
            </a>
        </div>
    );
};

export default QuickScrollButton;