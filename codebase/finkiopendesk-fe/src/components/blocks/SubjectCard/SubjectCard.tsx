import './subjectCard.scss'
import type {SubjectDto} from "../../../shared/dto/SubjectDto";

interface SubjectCardProps {
    subject: SubjectDto;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
    return (
        <div className="subject">
            <h3>{subject.name}</h3>
            {subject.description && <p>{subject.description}</p>}
        </div>
    );
};

export default SubjectCard;