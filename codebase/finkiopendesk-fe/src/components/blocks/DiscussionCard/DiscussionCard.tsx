import './discussionCard.scss';
import { useNavigate } from "react-router-dom";
import type {DiscussionObjectDto} from "../../../shared/dto/DiscussionObjectDto";
import {backapi} from "../../../shared/axios";
import {useAuth} from "../../../shared/AuthContext";

interface DiscussionCardProps extends DiscussionObjectDto {
    isFavorite: boolean;
    onToggleFavorite: (targetId: string, type: string) => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = (props) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const goToDiscussion = () => {
        switch (props.type) {
            case "profession":
                navigate(`/discussion/pid/${props.object.professionId}`);
                break;
            case "subject":
                navigate(`/discussion/sid/${props.object.subjectId}`);
                break;
            default:
                console.warn("Unknown discussion type:", props.type);
        }
    };

    const toggleFavorite = async () => {
        try {
            let id = "";

            switch (props.type) {
                case "profession":
                    id = props.object.professionId;
                    break;
                case "subject":
                    id = props.object.subjectId;
                    break;
            }

            await backapi.post(`/favorites/${user?.userId}/set`, {
                targetId: id,
                targetType: props.type
            });

            props.onToggleFavorite(id, props.type);

        } catch (err) {
            console.error("Failed to toggle favorite:", err);
        }
    };

    return (
        <div className="discussion-card">
            <div className="dc-header">
                <i className={`favorite-button bi ${props.isFavorite ? "bi-star-fill active" : "bi-star"}`} onClick={toggleFavorite}></i>
                <h3>{props.discussion.name}</h3>
            </div>
            {props.discussion.description && <p>{props.discussion.description}</p>}

            <button onClick={goToDiscussion}>Enter Discussion <i className="bi bi-arrow-right"></i></button>
        </div>
    );
};

export default DiscussionCard;
