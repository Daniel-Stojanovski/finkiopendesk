import './subjectCard.scss'
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {api, backapi} from "../../../shared/axios";
import type {VoteDto} from "../../../shared/dto/VoteDto";
import type {CardTypeKey} from "../../../shared/const/CardTypeConst";
import {CardType} from "../../../shared/const/CardTypeConst";
import {useAuth} from "../../../shared/AuthContext";
import {useEffect, useState} from "react";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";
import {useNavigate} from "react-router-dom";
import {useUserData} from "../../../shared/UserDataContext";

interface SubjectCardProps {
    type?: CardTypeKey;
    subject: SubjectDto;
    professionId?: string;
    voteCount?: number;
    userVote?: number;
    refreshVotes?: () => Promise<void>;
    meta?: {
        mandatoryPrograms: string[];
        electivePrograms: string[];
        otherPrograms: string[];
    }
}

const SubjectCard: React.FC<SubjectCardProps> = ({ type, subject, professionId, voteCount = 0, userVote, refreshVotes, meta }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { selectedUserProgram } = useUserData();

    const canUserVote = user && user.student;

    const [channels, setChannels] = useState<ChannelDto[]>([]);

    useEffect(() => {
        try {
            api.get<ChannelDto[]>(`/subjects/channels/sid/${subject.subjectId}/active`)
                .then(response => setChannels(response.data));
        }
        catch (err) {
            console.error("Channels for Subject not found", err);
        }
    }, []);

    const vote = userVote ?? 0;

    const handleVote = async (value: number) => {
        try {
            const currentVote = userVote ?? 0;
            const newVote = currentVote === value ? 0 : value;

            await backapi.post<VoteDto>("/subjects/vote", {
                subjectId: subject.subjectId,
                professionId: professionId,
                vote: newVote
            });

            {refreshVotes && await refreshVotes()}
        } catch (error) {
            console.error("Failed to vote ("+ value +"):", error);
        }
    };

    return (
        <div className={`subject ${vote ? "active"  : ""}`}>
            <div className="subject-content">
                <div className="sc-header">
                    <h3>{subject.name}</h3>
                    <div className="sc-tags">
                        {(meta?.mandatoryPrograms ?? []).length > 0 && (
                            <span>Mandatory: {meta?.mandatoryPrograms.map((ps, i) => (
                                <p key={i} className={`tag-label ${selectedUserProgram?.name == ps ? 'preferred' : ''}`}>#{ps}</p>
                            ))}
                            </span>
                        )}

                        {(meta?.electivePrograms ?? []).length > 0 && (
                            <span>Elective: {meta?.electivePrograms.map((ps, i) => (
                                <p key={i} className={`tag-label ${selectedUserProgram?.name == ps ? 'preferred' : ''}`}>#{ps}</p>
                            ))}
                            </span>
                        )}
                    </div>
                </div>
                {channels.map(tag => (
                    <p key={tag.channelId} className="channel-label" onClick={() => navigate(`/discussion/cid/${tag.channelId}`)}><i className="bi bi-tag"></i>{tag.name.split(' | ')[1]}</p>
                ))}
            </div>



            {type == CardType.VOTE &&
                <div className="subject-state">
                    { canUserVote &&
                        <i className={`bi ${vote === 1 ? "bi-caret-up-fill active" : "bi-caret-up"}`}
                            onClick={() => handleVote(1)}></i>}
                    <div className={`subject-state-data ${vote !== 0 ? "active bold" : ""}`}>
                        {voteCount}
                    </div>
                    { !canUserVote && <sub>Votes</sub>}
                    { canUserVote &&
                        <i className={`bi ${vote === -1 ? "bi-caret-down-fill active" : "bi-caret-down"}`}
                            onClick={() => handleVote(-1)}></i>}
                </div>
            }
        </div>
    );
};

export default SubjectCard;
