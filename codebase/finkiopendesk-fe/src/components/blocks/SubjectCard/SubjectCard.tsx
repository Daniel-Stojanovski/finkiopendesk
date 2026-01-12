import './subjectCard.scss'

const SubjectCard = ({ subject }) => {
    return (
        <div className="subject">
            <h3>{subject.name}</h3>
            {subject.description && (
                <p>{subject.description}</p>
            )}
        </div>
    );
};

export default SubjectCard;