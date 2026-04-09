import {useEffect, useMemo, useState} from "react";
import { useParams } from "react-router-dom";
import { api, backapi } from "../../../shared/axios";
import '../views.scss';
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import type { SubjectDto } from "../../../shared/dto/SubjectDto";
import type { VotesDataDto } from "../../../shared/dto/VoteDataDto";
import type { UserVoteDataDto } from "../../../shared/dto/UserVoteDataDto";
import { useOutletContext } from "react-router-dom";
import {useFilterArray} from "../../../shared/hooks";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useAuth} from "../../../shared/AuthContext";
import {useNavigate} from "react-router-dom";

const GuideProfessionSubjectCards = () => {
    const { pid } = useParams();
    const { user } = useAuth();
    const [pidSubjects, setPidSubjects] = useState<SubjectDto[]>([]);
    const [profession, setProfession] = useState<ProfessionDto | null>(null);
    const [votes, setVotes] = useState<Map<string, number>>(new Map());
    const [userVotes, setUserVotes] = useState<Map<string, number>>(new Map());

    const { searchQuery, filters } = useOutletContext<{ searchQuery: string, filters: any }>();

    const navigate = useNavigate();

    useEffect(() => {
        if (!pid) return;

        const subjectParams: any = { query: searchQuery || undefined, ...filters };
        Object.entries(filters).forEach(([key, value]) => {
            if (value) subjectParams[key] = value;
        });

        api.get<SubjectDto[]>(`/subjects/pid/${pid}`)
            .then(res => setPidSubjects(res.data))
            .catch(console.error);

        backapi.get<VotesDataDto[]>(`/votes/pid/${pid}`)
            .then(res => {
                const voteMap = new Map<string, number>(
                    res.data.map(v => [v.subjectId, v.voteCount])
                );
                setVotes(voteMap);
            })
            .catch(console.error);

        api.get<ProfessionDto>(`/professions/${pid}`)
            .then(res => setProfession(res.data))
            .catch(console.error);

    }, [pid]);

    useEffect(() => {
        if (!pid || !user?.userId) return;

        backapi.get<UserVoteDataDto[]>(`/votes/pid/${pid}/${user?.userId}`)
            .then(res => {
                const voteMap = new Map<string, number>(
                    res.data.map(v => [v.subjectId, v.vote])
                );
                setUserVotes(voteMap);
            })
            .catch(console.error);

    }, [pid, user]);

    const filteredSubjects = pidSubjects.filter(subject => {
        const matchesSearch =
            !searchQuery ||
            subject.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;

            return subject.tags?.some(st => {
                if (!st.tag) return false;

                return st.tag[key] === value;
            });
        });

        return matchesSearch && matchesFilters;
    });

    const recommendedIds = useMemo(() => {
        return new Set(
            profession?.recommendedSubjects?.map(s => s.subjectId) ?? []
        );
    }, [profession]);

    const array = useFilterArray<SubjectDto>(filteredSubjects, searchQuery, subject => [subject.name, subject.discussion?.name]);

    return (
        <>
            <div className="cards-view-header">
                <i className="bi bi-arrow-left-circle" onClick={() => navigate("/careers")}></i>
                <h3>{profession?.name}</h3>
            </div>
            <div id="subjects-grid">
                {array.map(subject => {
                    const isRecommended = recommendedIds.has(subject.subjectId);

                    return (
                        <SubjectCard
                            type='VOTE'
                            key={subject.subjectId}
                            subject={subject}
                            professionId={pid}
                            voteCount={votes.get(subject.subjectId) ?? 0}
                            userVote={userVotes.get(subject.subjectId) ?? 0}
                            isRecommended={isRecommended}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default GuideProfessionSubjectCards;