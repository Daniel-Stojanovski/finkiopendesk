import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import api from "../../../shared/axios";
import '../views.scss'
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";

const GuideProfessionSubjectCards = () => {
    const { pid } = useParams();
    const [pidSubjects, setPidSubjects] = useState<SubjectDto[]>([]);

    useEffect(() => {
        if (!pid) return;

        api.get<SubjectDto[]>(`/subjects/pid/${pid}`)
            .then(response => {
                setPidSubjects(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [pid]);

    return (
        <div id="subjects-grid">
            {pidSubjects.map(pidSubject => (
                <SubjectCard
                    key={pidSubject.subjectId}
                    subject={pidSubject}
                />
            ))}
        </div>
    );
}

export default GuideProfessionSubjectCards;