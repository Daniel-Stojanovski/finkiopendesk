import "./quickScrollButton.scss"

interface QuickScrollButtonProps{
    targetSection: string | undefined;
}

const QuickScrollButton: React.FC<QuickScrollButtonProps> = ({ targetSection }) => {
    return (
        <a id="utility-button" href={`#${targetSection}`}>
            <i className="bi bi-arrows-vertical"></i>Go to {targetSection}
        </a>
    );
};

export default QuickScrollButton;