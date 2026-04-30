import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
// import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useEffect, useState} from "react";
import {backapi} from "../../../shared/axios";
import type {ProgramSubjectDto} from "../../../shared/dto/ProgramSubjectDto";
import Spinner from "../../../components/utility/Spinner/Spinner";
// import {VotesDataDto} from "../../../shared/dto/VoteDataDto";
// import {VoteDto} from "../../../shared/dto/VoteDto";

interface GuideProfessionSubjectCardsProps {
    // votes: VoteDto[],
    // userVotes: VotesDataDto[],
    votes: Map<string, number>,
    userVotes: Map<string, number>,
    profession: ProfessionDto | null,
    // subjects: SubjectDto[] | null,
    loading: boolean
}

const GuideProfessionSubjectCards:React.FC<GuideProfessionSubjectCardsProps> = ({votes, userVotes, profession, loading}) => {
    const [programSubjects, setProgramSubjects] = useState<ProgramSubjectDto[]>([]);

    useEffect(() => {
        if (!profession?.professionId) return;

        backapi.get(`/program-subjects/pid/${profession.professionId}`)
            .then(res => setProgramSubjects(res.data))

    }, [profession?.professionId]);

    const groupedBySubject = new Map<string, ProgramSubjectDto[]>();

    programSubjects.forEach(ps => {
        const key = ps.subject.subjectId;

        if (!groupedBySubject.has(key)) {
            groupedBySubject.set(key, []);
        }

        groupedBySubject.get(key)!.push(ps);
    });

    const renderSubject = (subjectId: string, items: ProgramSubjectDto[]) => {
        const mandatoryPrograms = items
            .filter(i => i.type === "MANDATORY")
            .map(i => i.programName);

        const electivePrograms = items
            .filter(i => i.type === "ELECTIVE")
            .map(i => i.programName);

        const otherPrograms = items
            .filter(i => i.type === "OTHER")
            .map(i => i.programName);

        const subject = items[0].subject;

        return (
            <SubjectCard
                key={subjectId}
                type="VOTE"
                subject={subject}
                voteCount={votes.get(subjectId) ?? 0}
                userVote={userVotes.get(subjectId) ?? 0}
                meta={{
                    mandatoryPrograms,
                    electivePrograms,
                    otherPrograms
                }}
            />
        );
    };

    if (loading) return <Spinner size={4} />;

    return (
        <>
            {Array.from(groupedBySubject.entries()).map(([subjectId, items]) =>
                renderSubject(subjectId, items)
            )}
        </>
    );
};

export default GuideProfessionSubjectCards;