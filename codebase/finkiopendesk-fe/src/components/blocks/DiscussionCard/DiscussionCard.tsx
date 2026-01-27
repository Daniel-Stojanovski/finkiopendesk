import './discussionCard.scss';
import { useNavigate } from "react-router-dom";

const DiscussionCard = ({ object, type, discussion }) => {
    const navigate = useNavigate();

    const goToDiscussion = () => {
        switch (type) {
            case "profession":
                navigate(`/discussion/pid/${object.professionId}`);
                break;
            case "subject":
                navigate(`/discussion/sid/${object.subjectId}`);
                break;
            default:
                console.warn("Unknown discussion type:", type);
        }
    };

    return (
        <div className="discussion-card">
            <h3>{discussion.name}</h3>
            {discussion.description && <p>{discussion.description}</p>}

            <button onClick={goToDiscussion}>Enter Discussion</button>
        </div>
    );
};

export default DiscussionCard;
