import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss';
import DiscussionCard from "../../../components/blocks/DiscussionCard/DiscussionCard";
import QuickScrollButton from "../../../components/utility/QuickScrollButton/QuickScrollButton";
import {useSectionScroll} from "../../../shared/hooks";

const ForumDiscussionCards = () => {
    const [subjectDiscussions, setSubjectDiscussions] = useState([]);
    const [professionDiscussions, setProfessionDiscussions] = useState([]);

    useEffect(() => {
        api.get("/professions").then(response => setProfessionDiscussions(response.data));
        api.get("/subjects").then(response => setSubjectDiscussions(response.data));
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
                            .filter(p => p.discussion)
                            .map(discussion => (
                                <DiscussionCard
                                    key={discussion.discussionId}
                                    discussion={discussion}
                                />
                            ))}
                    </div>
                </section>

                <hr />

                <section id="Subjects">
                    <h2> Subjects </h2>
                    <div className="discussions-sub-grid">
                        {subjectDiscussions
                            .filter(s => s.discussion)
                            .map(discussion => (
                                <DiscussionCard
                                    key={discussion.discussionId}
                                    discussion={discussion}
                                />
                            ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default ForumDiscussionCards;
