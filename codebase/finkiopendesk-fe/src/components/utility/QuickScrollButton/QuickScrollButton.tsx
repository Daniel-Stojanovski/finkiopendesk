import "./quickScrollButton.scss"

interface QuickScrollButtonProps{
    targetSection: string | undefined;
}

const QuickScrollButton: React.FC<QuickScrollButtonProps> = ({ targetSection }) => {
    return (
        <div id="utility-button">
            <a href={`#${targetSection}`}>
                Go to {targetSection}
            </a>
        </div>
    );
};

export default QuickScrollButton;