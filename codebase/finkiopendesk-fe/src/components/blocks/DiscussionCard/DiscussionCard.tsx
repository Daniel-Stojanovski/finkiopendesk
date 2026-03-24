import './discussionCard.scss';
import { useNavigate } from "react-router-dom";
import type {DiscussionObjectDto} from "../../../shared/dto/DiscussionObjectDto";

const DiscussionCard: React.FC<DiscussionObjectDto> = (props) => {

    const navigate = useNavigate();

    const goToDiscussion = () => {
        switch (props.type) {
            case "profession":
                navigate(`/discussion/pid/${props.object.professionId}`);
                break;
            case "subject":
                navigate(`/discussion/sid/${props.object.subjectId}`);
                break;
            default:
                console.warn("Unknown discussion type:", this);
        }
    };

    return (
        <div className="discussion-card">
            <h3>{props.discussion.name}</h3>
            {props.discussion.description && <p>{props.discussion.description}</p>}

            <button onClick={goToDiscussion}>Enter Discussion <i className="bi bi-arrow-right"></i></button>
        </div>
    );
};

export default DiscussionCard;
