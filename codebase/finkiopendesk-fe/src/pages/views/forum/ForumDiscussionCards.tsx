import { useEffect, useState } from "react";
import {backapi} from "../../../shared/axios";
import '../views.scss';
import DiscussionCard from "../../../components/blocks/DiscussionCard/DiscussionCard";
import QuickScrollButton from "../../../components/utility/QuickScrollButton/QuickScrollButton";
import {useDebounce, useSectionScroll} from "../../../shared/hooks";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {useOutletContext} from "react-router-dom";
import {useUserData} from "../../../shared/UserDataContext";
import type {FiltersDto} from "../../../shared/dto/FiltersDto";
import type {TagDto} from "../../../shared/dto/TagDto";
import Spinner from "../../../components/utility/Spinner/Spinner";

const ForumDiscussionCards = () => {
    const { favorites } = useUserData();

    const [subjectDiscussions, setSubjectDiscussions] = useState<SubjectDto[]>([]);
    const [professionDiscussions, setProfessionDiscussions] = useState<ProfessionDto[]>([]);

    const { searchQuery, filters } = useOutletContext<{ searchQuery: string, filters: FiltersDto }>();

    const [collapsed, setCollapsed] = useState({
        professions: false,
        subjects: false
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(isFilterActive) {
            setCollapsed(prev => ({
                ...prev,
                professions: true
            }));
        }
    }, [filters]);

    const toggleSection = (section: "professions" | "subjects") => {
        setCollapsed(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const fetchData = async (searchQuery: string) => {
        const professionParams: any = { query: searchQuery || undefined };
        const subjectParams: any = { query: searchQuery || undefined, ...filters };

        Object.entries(filters).forEach(([key, value]) => {
            if (value) subjectParams[key] = value;
        });

        try {
            setLoading(true);

            await Promise.all([
                backapi.get<ProfessionDto[]>('/professions', { params: professionParams }).then(res => setProfessionDiscussions(res.data)),
                backapi.get<SubjectDto[]>('/subjects', { params: subjectParams }).then(res => setSubjectDiscussions(res.data))
            ]);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
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

    const debouncedQuery = useDebounce(searchQuery, 1000);

    useEffect(() => {
        if (!debouncedQuery && !Object.values(filters).some(v => v)) {
            fetchData("");
            return;
        }

        fetchData(debouncedQuery);
    }, [debouncedQuery, filters]);

    const checkTargetFavorite = (targetId: string, targetType: "subject" | "profession"): boolean => {
        return favorites.some(f => f.targetId === targetId && f.targetType === targetType);
    };

    const activeSection = useSectionScroll(["Professions", "Subjects"]);

    const isFilterActive = Object.values(filters).some(v => v !== null);

    return (
        <>
            <div id="discussions-grid">
                <QuickScrollButton targetSection={activeSection} />

                <section id="Professions">
                    <h2 onClick={() => toggleSection("professions")} className="section-header">
                        Professions
                        <i className={`bi ${collapsed.professions ? "bi-chevron-down" : "bi-chevron-up"}`}></i>
                    </h2>
                    {!collapsed.professions && (
                        <div>
                            {loading ? (
                                <div className="spinner-container">
                                    <Spinner size={2}/>
                                </div>
                            ) : professionDiscussions.length === 0 ? (
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
                    )}
                </section>

                <section id="Subjects">
                    <h2 onClick={() => toggleSection("subjects")} className="section-header">
                        Subjects
                        <i className={`bi ${collapsed.subjects ? "bi-chevron-down" : "bi-chevron-up"}`}></i>
                    </h2>
                    {!collapsed.subjects && (
                        <div>
                            {loading ? (
                                <div className="spinner-container">
                                    <Spinner size={2}/>
                                </div>
                            ) : filteredSubjects.length === 0 ? (
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
                    )}
                </section>
            </div>
        </>
    );
};

export default ForumDiscussionCards;
