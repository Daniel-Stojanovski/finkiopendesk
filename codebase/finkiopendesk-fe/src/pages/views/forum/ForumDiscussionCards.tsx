import { useEffect, useState } from "react";
import {backapi} from "../../../shared/axios";
import '../views.scss';
import DiscussionCard from "../../../components/blocks/DiscussionCard/DiscussionCard";
import QuickScrollButton from "../../../components/utility/QuickScrollButton/QuickScrollButton";
import {useSectionScroll} from "../../../shared/hooks";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {useOutletContext} from "react-router-dom";
import {useUserData} from "../../../shared/UserDataContext";
import type {FiltersDto} from "../../../shared/dto/FiltersDto";
import type {TagDto} from "../../../shared/dto/TagDto";

const ForumDiscussionCards = () => {
    const { favorites } = useUserData();

    const [subjectDiscussions, setSubjectDiscussions] = useState<SubjectDto[]>([]);
    const [professionDiscussions, setProfessionDiscussions] = useState<ProfessionDto[]>([]);

    const { searchQuery, filters } = useOutletContext<{ searchQuery: string, filters: FiltersDto }>();

    const fetchData = async () => {
        const professionParams: any = { query: searchQuery || undefined };
        const subjectParams: any = { query: searchQuery || undefined, ...filters };

        Object.entries(filters).forEach(([key, value]) => {
            if (value) subjectParams[key] = value;
        });

        try {
            await Promise.all([
                backapi.get<ProfessionDto[]>('/professions', { params: professionParams }).then(res => setProfessionDiscussions(res.data)),
                backapi.get<SubjectDto[]>('/subjects', { params: subjectParams }).then(res => setSubjectDiscussions(res.data))
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredSubjects = subjectDiscussions.filter(subject => {
        const matchesSearch =
            !searchQuery ||
            subject.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilters = Object.entries(filters).every(([key, value]) => {
            if (!value) return true;

            return subject.tags?.some(st => {
                if (!st.tag) return false;

                return st.tag[key as keyof TagDto] === value;
            });
        });

        return matchesSearch && matchesFilters;
    });

    useEffect(() => {
        fetchData();
    }, [searchQuery, filters]);

    const checkTargetFavorite = (targetId: string, targetType: "subject" | "profession"): boolean => {
        return favorites.some(f => f.targetId === targetId && f.targetType === targetType);
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
                                />
                            ))
                        )}
                    </div>
                </section>

                <section id="Subjects">
                    <h2> Subjects </h2>
                    <div className="discussions-sub-grid">
                        {filteredSubjects.length === 0 ? (
                            <p className="empty-message">
                                {searchQuery
                                    ? "No discussions match the search."
                                    : "No discussions found."}
                            </p>
                        ) : (
                            filteredSubjects.map(subject => (
                                <DiscussionCard
                                    key={subject.discussion.subjectDiscussionId}
                                    type={"subject"}
                                    discussion={subject.discussion}
                                    object={subject}
                                    isFavorite={checkTargetFavorite(subject.subjectId, "subject")}
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
