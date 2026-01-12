import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss'
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";

const ForumSubjectCards = () => {
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        api.get("/subjects")
            .then(response => {
                setSubjects(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <div id="subjects-grid">
            {subjects.map(subject => (
                <SubjectCard
                    key={subject.subjectId}
                    subject={subject}
                />
            ))}
        </div>
    );
}

export default ForumSubjectCards;