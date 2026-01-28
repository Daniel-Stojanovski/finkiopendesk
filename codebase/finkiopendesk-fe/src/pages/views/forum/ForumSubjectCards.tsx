import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss'
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";

const ForumSubjectCards = () => {
    const [subjects, setSubjects] = useState<SubjectDto[]>([]);

    useEffect(() => {
        api.get<SubjectDto[]>("/subjects")
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