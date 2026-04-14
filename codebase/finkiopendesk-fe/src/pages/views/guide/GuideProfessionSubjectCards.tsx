import "../views.scss";
import { useEffect, useMemo, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { api, backapi } from "../../../shared/axios";
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import Spinner from "../../../components/utility/Spinner/Spinner";
import type { SubjectDto } from "../../../shared/dto/SubjectDto";
import type { VotesDataDto } from "../../../shared/dto/VoteDataDto";
import type { UserVoteDataDto } from "../../../shared/dto/UserVoteDataDto";
import type { ProfessionDto } from "../../../shared/dto/ProfessionDto";
import type { FiltersDto } from "../../../shared/dto/FiltersDto";
import type { TagDto } from "../../../shared/dto/TagDto";
import { useAuth } from "../../../shared/AuthContext";
import { useFilterArray } from "../../../shared/hooks";

const GuideProfessionSubjectCards = () => {
    const { pid } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { searchQuery, filters } = useOutletContext<{ searchQuery: string; filters: FiltersDto; }>();

    const [pidSubjects, setPidSubjects] = useState<SubjectDto[]>([]);
    const [profession, setProfession] = useState<ProfessionDto | null>(null);
    const [votes, setVotes] = useState<Map<string, number>>(new Map());
    const [userVotes, setUserVotes] = useState<Map<string, number>>(new Map());
    const [loading, setLoading] = useState(false);

    const refreshVotes = async () => {
        await Promise.all([
            backapi.get<VotesDataDto[]>(`/votes/pid/${pid}`).then(res => {
                const voteMap = new Map<string, number>(
                    res.data.map(v => [v.subjectId, v.voteCount])
                );
                setVotes(voteMap)
            }).catch(console.error),

            user?.userId && (
                backapi.get<UserVoteDataDto[]>(`/votes/pid/${pid}/${user?.userId}`).then(res => {
                    setUserVotes(
                        new Map(res.data.map(v => [v.subjectId, v.vote]))
                    );
                }).catch(console.error)
            )
        ]);
    };

    useEffect(() => {
        if (!pid) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                await Promise.all([
                    api.get<SubjectDto[]>(`/subjects/pid/${pid}`)
                        .then(res => setPidSubjects(res.data))
                        .catch(console.error),

                    backapi.get<VotesDataDto[]>(`/votes/pid/${pid}`)
                        .then(res => {
                            const voteMap = new Map<string, number>(
                                res.data.map(v => [v.subjectId, v.voteCount])
                            );
                            setVotes(voteMap)
                        })
                        .catch(console.error),

                    api.get<ProfessionDto>(`/professions/${pid}`)
                        .then(res => setProfession(res.data))
                        .catch(console.error)
                ]);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [pid]);

    useEffect(() => {
        if (!pid || !user?.userId) return;

        backapi.get<UserVoteDataDto[]>(`/votes/pid/${pid}/${user.userId}`)
            .then(res => {
                setUserVotes(
                    new Map(res.data.map(v => [v.subjectId, v.vote]))
                );
            })
            .catch(console.error);

    }, [pid, user]);

    const filteredSubjects = useMemo(() => {
        return pidSubjects.filter(subject => {
            const matchesSearch =
                !searchQuery ||
                subject.name.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesFilters = Object.entries(filters).every(([key, value]) => {
                if (!value) return true;

                return subject.tags?.some(st =>
                    st.tag?.[key as keyof TagDto] === value
                );
            });

            return matchesSearch && matchesFilters;
        });
    }, [pidSubjects, searchQuery, filters]);

    const recommendedIds = useMemo(() => {
        return new Set(
            profession?.recommendedSubjects?.map(s => s.subjectId) ?? []
        );
    }, [profession]);

    const array = useFilterArray<SubjectDto>(filteredSubjects, searchQuery, subject => [subject.name, subject.discussion?.name]);

    return (
        <>
            <div className="cards-view-header">
                <i className="bi bi-arrow-left-circle"
                   onClick={() => navigate("/careers")}>
                </i>
                <h3>{profession?.name}</h3>
            </div>

            {loading ? (
                <div className="spinner-container">
                    <Spinner size={4} />
                </div>
            ) : array.length === 0 ? (
                <p className="empty-message">No subjects found.</p>
            ) : (
                <div id="subjects-grid">
                    {array.map(subject => {
                        const isRecommended = recommendedIds.has(subject.subjectId);

                        return (
                            <SubjectCard
                                type="VOTE"
                                key={subject.subjectId}
                                subject={subject}
                                professionId={pid}
                                voteCount={votes.get(subject.subjectId) ?? 0}
                                userVote={userVotes.get(subject.subjectId) ?? 0}
                                isRecommended={isRecommended}
                                refreshVotes={refreshVotes}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default GuideProfessionSubjectCards;