import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
// import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useEffect, useState} from "react";
import {backapi} from "../../../shared/axios";
import type {ProgramSubjectDto} from "../../../shared/dto/ProgramSubjectDto";
import Spinner from "../../../components/utility/Spinner/Spinner";
import {useOutletContext} from "react-router-dom";
import type {FiltersDto} from "../../../shared/dto/FiltersDto";
import type {TagDto} from "../../../shared/dto/TagDto";
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

    const { searchQuery, filters } = useOutletContext<{ searchQuery: string, filters: FiltersDto }>();

    const fetchData = async (searchQuery: string) => {
        const programSubjectParams: any = { query: searchQuery || undefined, ...filters };

        Object.entries(filters).forEach(([key, value]) => {
            if (value) programSubjectParams[key] = value;
        });

        try {
            await Promise.all([
                backapi.get(`/program-subjects/pid/${profession?.professionId}`, { params: programSubjectParams })
                    .then(res => setProgramSubjects(res.data))
            ]);
        } catch (err) {
            console.error(err);
        }
    }

    if (!profession?.professionId) {
        return <Spinner size={4} />;
    }

    useEffect(() => {
        if (!profession?.professionId) return;

        if (!searchQuery && !Object.values(filters).some(v => v)) {
            fetchData("");
            return;
        }

        fetchData(searchQuery);
    }, [searchQuery, filters, profession?.professionId]);

    const groupedBySubject = new Map<string, ProgramSubjectDto[]>();

    const filteredProgramSubjects = programSubjects.filter(ps => {
        const subject = ps.subject;

        const matchesSearch =
            !searchQuery ||
            subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.discussion?.name?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;

            return subject.tags?.some(st => {
                if (!st.tag) return false;

                return st.tag[key as keyof TagDto] === value;
            });
        });

        return matchesSearch && matchesFilters;
    });

    filteredProgramSubjects.forEach(ps => {
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
                professionId={profession.professionId}
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

    const entries = Array.from(groupedBySubject.entries());

    if (entries.length === 0) {
        return (
            <p className="empty-message">
                {searchQuery
                    ? "No subjects match the search."
                    : "No subjects found."}
            </p>
        );
    }

    return (
        <>
            {entries.map(([subjectId, items]) =>
                renderSubject(subjectId, items)
            )}
        </>
    );
};

export default GuideProfessionSubjectCards;