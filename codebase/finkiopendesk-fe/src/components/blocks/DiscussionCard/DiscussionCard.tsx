import './discussionCard.scss';
import { useNavigate } from "react-router-dom";
import type {DiscussionObjectDto} from "../../../shared/dto/DiscussionObjectDto";
import {useUserData} from "../../../shared/UserDataContext";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {useAuth} from "../../../shared/AuthContext";
import {DiscussionType} from "../../../shared/const/DiscussionTypeConst";
import {useEffect, useState} from "react";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";
import {api} from "../../../shared/axios";

interface DiscussionCardProps extends DiscussionObjectDto {
    isFavorite: boolean;
}

const DiscussionCard: React.FC<DiscussionCardProps> = (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { toggleFavorite } = useUserData();

    const [channels, setChannels] = useState<ChannelDto[]>([]);

    useEffect(() => {
        try {
            if (props.type == DiscussionType.SUBJECT) {
            api.get<ChannelDto[]>(`/subjects/channels/sid/${(props.object as SubjectDto).subjectId}/active`)
                .then(response => setChannels(response.data));
            }
        }
        catch (err) {
            console.error("Discussion Type found: Profession; must be: Subject ", err);
        }
    }, []);

    const canUserContribute =
        user && (
            user.student || (!user.student && (props.type == DiscussionType.PROFESSION))
        );

    const targetId = (
        props.type === DiscussionType.PROFESSION
            ? (props.object as ProfessionDto).professionId
            : (props.object as SubjectDto).subjectId
    );

    const goToDiscussion = () => {
        switch (props.type) {
            case "profession":
                navigate(`/discussion/pid/${(props.object as ProfessionDto).professionId}`);
                break;
            case "subject":
                navigate(`/discussion/sid/${(props.object as SubjectDto).subjectId}`);
                break;
            default:
                console.warn("Unknown discussion type:", props.type);
        }
    };

    return (
        <div className="discussion-card">
            <div className="dc-header">
                { canUserContribute &&
                    <i className={`favorite-button bi ${props.isFavorite ? "bi-star-fill active" : "bi-star"}`}
                             onClick={() => toggleFavorite(targetId, props.type)}>
                    </i>
                }
                <h3>{props.discussion.name}</h3>

                {props.type == DiscussionType.SUBJECT && (
                    channels.map(tag => (
                        <p key={tag.channelId} className="tag-label" onClick={() => navigate(`/discussion/cid/${tag.channelId}`)}><i className="bi bi-tag"></i>{tag.name.split(' | ')[1]}</p>
                    ))
                )}

            </div>
            {props.discussion.description && <p>{props.discussion.description}</p>}

            <button onClick={goToDiscussion}>
                {canUserContribute
                    ? <>Enter Discussion <i className="bi bi-arrow-right"></i></>
                    : <>View Discussion <i className="bi bi-eye"></i></>
                }
            </button>
        </div>
    );
};

export default DiscussionCard;
