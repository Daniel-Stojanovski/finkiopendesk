import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {api, backapi} from "../../../shared/axios";
import '../views.scss'
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import type {VotesDataDto} from "../../../shared/dto/VoteDataDto";

const GuideProfessionSubjectCards = () => {
    const { pid } = useParams();
    const [pidSubjects, setPidSubjects] = useState<SubjectDto[]>([]);
    const [votes, setVotes] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        if (!pid) return;

        api.get<SubjectDto[]>(`/subjects/pid/${pid}`)
            .then(response => {
                setPidSubjects(response.data);
            })
            .catch(error => {
                console.error(error);
            })

        backapi.get<VotesDataDto[]>(`/votes/${pid}`)
            .then(res => {
                const voteMap = new Map<string, number>(
                    res.data.map(v => [v.subjectId, v.voteCount])
                );
                setVotes(voteMap);
            })
            .catch(console.error);
    }, [pid]);

    return (
        <div id="subjects-grid">
            {pidSubjects.map(pidSubject => (
                <SubjectCard
                    type='VOTE'
                    key={pidSubject.subjectId}
                    subject={pidSubject}
                    professionId={pid}
                    voteCount={votes.get(pidSubject.subjectId) ?? 0}
                />
            ))}
        </div>
    );
}

export default GuideProfessionSubjectCards;
