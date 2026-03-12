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
}

const SubjectCard: React.FC<SubjectCardProps> = ({ type, subject, professionId, voteCount = 0 }) => {

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
                <h3>{subject.name}</h3>
                {subject.description && <p>{subject.description}</p>}
            </div>

            {type == CardType.VOTE &&
                <div className="subject-state">
                    <button onClick={() => handleVote(1)}>^</button>
                    <div className="subject-state-data">
                        {voteCount}
                    </div>
                    <button onClick={() => handleVote(-1)}>v</button>
                </div>
            }
        </div>
    );
};

export default SubjectCard;
