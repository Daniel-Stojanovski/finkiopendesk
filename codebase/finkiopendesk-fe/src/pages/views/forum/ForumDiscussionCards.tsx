import { useEffect, useState } from "react";
import {api, backapi} from "../../../shared/axios";
import '../views.scss';
import DiscussionCard from "../../../components/blocks/DiscussionCard/DiscussionCard";
import QuickScrollButton from "../../../components/utility/QuickScrollButton/QuickScrollButton";
import {useSectionScroll} from "../../../shared/hooks";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import {useOutletContext} from "react-router-dom";

const ForumDiscussionCards = () => {
    const [subjectDiscussions, setSubjectDiscussions] = useState<SubjectDto[]>([]);
    const [professionDiscussions, setProfessionDiscussions] = useState<ProfessionDto[]>([]);

    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    useEffect(() => {
        if (!searchQuery) {
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

    const activeSection = useSectionScroll(["Professions", "Subjects"]);

    return (
        <>
            <div id="discussions-grid">
                <QuickScrollButton targetSection={activeSection} />

                <section id="Professions">
                    <h2> Professions </h2>
                    <div className="discussions-sub-grid">
                        {professionDiscussions
                            .map(profession => (
                                <DiscussionCard
                                    key={profession.discussion.professionDiscussionId}
                                    type={"profession"}
                                    discussion={profession.discussion}
                                    object={profession}
                                />
                            ))}
                    </div>
                </section>

                <hr />

                <section id="Subjects">
                    <h2> Subjects </h2>
                    <div className="discussions-sub-grid">
                        {subjectDiscussions
                            .map(subject => (
                                <DiscussionCard
                                    key={subject.discussion.subjectDiscussionId}
                                    type={"subject"}
                                    discussion={subject.discussion}
                                    object={subject}
                                />
                            ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ForumDiscussionCards;
