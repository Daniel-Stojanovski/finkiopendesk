import './subjectCard.scss'
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {backapi} from "../../../shared/axios";
import type {VoteDto} from "../../../shared/dto/VoteDto";
import type {CardTypeKey} from "../../../shared/const/CardTypeConst";
import {CardType} from "../../../shared/const/CardTypeConst";

interface SubjectCardProps {
    type?: CardTypeKey;
    subject: SubjectDto;
    professionId?: string;
    voteCount?: number;
    isRecommended?: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ type, subject, professionId, voteCount = 0, isRecommended }) => {

    const handleVote = async (value: number) => {
        try {
            await backapi.post<VoteDto>("/subjects/vote", {
                subjectId: subject.subjectId,
                professionId: professionId,
                vote: value
            });
        } catch (error) {
            console.error("Failed to vote ("+ value +"):", error);
        }
    };

    return (
        <div className="subject">
            <div className="subject-content">
                {(type == CardType.VOTE && isRecommended) && <i className="bi bi-bookmark-fill recommended"></i>}
                <h3>{subject.name}</h3>
                {subject.description && <p>{subject.description}</p>}
            </div>

            {type == CardType.VOTE &&
                <div className="subject-state">
                    <i className="bi bi-caret-up" onClick={() => handleVote(1)}></i>
                    <div className="subject-state-data">
                        {voteCount}
                    </div>
                    <i className="bi bi-caret-down" onClick={() => handleVote(-1)}></i>
                </div>
            }
        </div>
    );
};

export default SubjectCard;
