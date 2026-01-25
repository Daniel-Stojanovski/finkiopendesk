import './discussionCard.scss'

const DiscussionCard = ({ discussion }) => {
    return (
        <div className="discussion-card">
            <h3>{discussion.name}</h3>
            {discussion.description && (
                <p>{discussion.description}</p>
            )}
            <button> Enter Discussion </button>
        </div>
    );
};

export default DiscussionCard;