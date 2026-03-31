import { useEffect, useState } from "react";
import {api, backapi} from "../../../shared/axios";
import '../views.scss';
import DiscussionCard from "../../../components/blocks/DiscussionCard/DiscussionCard";
import QuickScrollButton from "../../../components/utility/QuickScrollButton/QuickScrollButton";
import {useSectionScroll} from "../../../shared/hooks";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {useOutletContext} from "react-router-dom";
import {useAuth} from "../../../shared/AuthContext";
import type {UserFavoriteDto} from "../../../shared/dto/UserFavoriteDto";

const ForumDiscussionCards = () => {
    const { user } = useAuth();

    const [subjectDiscussions, setSubjectDiscussions] = useState<SubjectDto[]>([]);
    const [professionDiscussions, setProfessionDiscussions] = useState<ProfessionDto[]>([]);

    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    const [favorites, setFavorites] = useState<UserFavoriteDto[]>([]);

    useEffect(() => {
        if (!user?.userId) return;
        backapi.get(`/favorites/${user.userId}`).then(res => setFavorites(res.data));
    }, [user]);

    useEffect(() => {
        if (!searchQuery?.trim()) {
            api.get<ProfessionDto[]>("/professions").then(res => setProfessionDiscussions(res.data));
            api.get<SubjectDto[]>("/subjects").then(res => setSubjectDiscussions(res.data));
            return;
        }

        const fetchSearch = async () => {
            try {
                await Promise.all([
                    backapi.get<ProfessionDto[]>('/professions', {params: { query: searchQuery || undefined }})
                        .then(res => setProfessionDiscussions(res.data)),
                    backapi.get<SubjectDto[]>('/subjects', {params: { query: searchQuery || undefined }})
                        .then(res => setSubjectDiscussions(res.data))
                ]);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSearch();

    }, [searchQuery]);

    const checkTargetFavorite = (targetId: string, targetType: "subject" | "profession"): boolean => {
        return favorites.some(f => f.targetId === targetId && f.targetType === targetType);
    };

    const handleToggleFavorite = (targetId: string, targetType: "subject" | "profession") => {
        setFavorites(prev =>
            prev.some(f => f.targetId === targetId && f.targetType === targetType)
                ? prev.filter(f => !(f.targetId === targetId && f.targetType === targetType))
                : [...prev, { targetId, targetType }]
        );
    };

    const activeSection = useSectionScroll(["Professions", "Subjects"]);

    return (
        <>
            <div id="discussions-grid">
                <QuickScrollButton targetSection={activeSection} />

                <section id="Professions">
                    <h2> Professions </h2>
                    <div className="discussions-sub-grid">
                        {professionDiscussions.length === 0 ? (
                            <p className="empty-message">
                                {searchQuery
                                    ? "No discussions match the search."
                                    : "No discussions found."}
                            </p>
                        ) : (
                            professionDiscussions.map(profession => (
                                <DiscussionCard
                                    key={profession.discussion.professionDiscussionId}
                                    type={"profession"}
                                    discussion={profession.discussion}
                                    object={profession}
                                    isFavorite={checkTargetFavorite(profession.professionId, "profession")}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))
                        )}
                    </div>
                </section>

                <section id="Subjects">
                    <h2> Subjects </h2>
                    <div className="discussions-sub-grid">
                        {subjectDiscussions.length === 0 ? (
                            <p className="empty-message">
                                {searchQuery
                                    ? "No discussions match the search."
                                    : "No discussions found."}
                            </p>
                        ) : (
                            subjectDiscussions.map(subject => (
                                <DiscussionCard
                                    key={subject.discussion.subjectDiscussionId}
                                    type={"subject"}
                                    discussion={subject.discussion}
                                    object={subject}
                                    isFavorite={checkTargetFavorite(subject.subjectId, "subject")}
                                    onToggleFavorite={handleToggleFavorite}
                                />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ForumDiscussionCards;
