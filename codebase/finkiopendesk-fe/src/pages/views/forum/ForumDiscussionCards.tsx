import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss';
import DiscussionCard from "../../../components/blocks/DiscussionCard/DiscussionCard";
import QuickScrollButton from "../../../components/utility/QuickScrollButton/QuickScrollButton";
import {useSectionScroll} from "../../../shared/hooks";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";

const ForumDiscussionCards = () => {
    const [subjectDiscussions, setSubjectDiscussions] = useState<SubjectDto[]>([]);
    const [professionDiscussions, setProfessionDiscussions] = useState<ProfessionDto[]>([]);

    useEffect(() => {
        api.get<ProfessionDto[]>("/professions").then(response => setProfessionDiscussions(response.data));
        api.get<SubjectDto[]>("/subjects").then(response => setSubjectDiscussions(response.data));
    }, []);

    const activeSection = useSectionScroll(["Professions", "Subjects"]);

    return (
        <>
            <QuickScrollButton targetSection={activeSection} />

            <div id="discussions-grid">
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
