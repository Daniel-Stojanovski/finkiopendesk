import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
// import {VotesDataDto} from "../../../shared/dto/VoteDataDto";
// import {VoteDto} from "../../../shared/dto/VoteDto";

interface GuideProfessionSubjectCardsProps {
    // votes: VoteDto[],
    // userVotes: VotesDataDto[],
    votes: Map<string, number>,
    userVotes: Map<string, number>,
    profession: ProfessionDto | null,
    subjects: SubjectDto[] | null,
    loading: boolean
}

const GuideProfessionSubjectCards:React.FC<GuideProfessionSubjectCardsProps> = ({votes, userVotes, profession, subjects, loading}) => {

    const mandatory: SubjectDto[] = [];
    const elective: SubjectDto[] = [];
    const others: SubjectDto[] = [];

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <h3>Mandatory</h3>
            {mandatory.map(subject => (
                <SubjectCard
                    key={subject.subjectId}
                    subject={subject}
                    voteCount={votes.get(subject.subjectId) ?? 0}
                    userVote={userVotes.get(subject.subjectId) ?? 0}
                />
            ))}

            <h3>Elective</h3>
            {elective.map(subject => (
                <SubjectCard
                    key={subject.subjectId}
                    subject={subject}
                    voteCount={votes.get(subject.subjectId) ?? 0}
                    userVote={userVotes.get(subject.subjectId) ?? 0}
                />
            ))}

            <h3>Others</h3>
            {others.map(subject => (
                <SubjectCard
                    key={subject.subjectId}
                    subject={subject}
                    voteCount={votes.get(subject.subjectId) ?? 0}
                    userVote={userVotes.get(subject.subjectId) ?? 0}
                />
            ))}
        </>
    );
};

export default GuideProfessionSubjectCards;