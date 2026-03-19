import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { api, backapi } from "../../../shared/axios";
import '../views.scss';
import SubjectCard from "../../../components/blocks/SubjectCard/SubjectCard";
import type { SubjectDto } from "../../../shared/dto/SubjectDto";
import type { VotesDataDto } from "../../../shared/dto/VoteDataDto";
import { useOutletContext } from "react-router-dom";
import {useFilterArray} from "../../../shared/hooks";

const GuideProfessionSubjectCards = () => {
    const { pid } = useParams();
    const [pidSubjects, setPidSubjects] = useState<SubjectDto[]>([]);
    const [votes, setVotes] = useState<Map<string, number>>(new Map());

    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    useEffect(() => {
        if (!pid) return;

        api.get<SubjectDto[]>(`/subjects/pid/${pid}`)
            .then(res => setPidSubjects(res.data))
            .catch(console.error);

        backapi.get<VotesDataDto[]>(`/votes/${pid}`)
            .then(res => {
                const voteMap = new Map<string, number>(
                    res.data.map(v => [v.subjectId, v.voteCount])
                );
                setVotes(voteMap);
            })
            .catch(console.error);

    }, [pid]);

    const array = useFilterArray<SubjectDto>(pidSubjects, searchQuery, subject => [subject.name, subject.discussion?.name]);

    return (
        <div id="subjects-grid">
            {array.map(subject => (
                <SubjectCard
                    type='VOTE'
                    key={subject.subjectId}
                    subject={subject}
                    professionId={pid}
                    voteCount={votes.get(subject.subjectId) ?? 0}
                />
            ))}
        </div>
    );
};

export default GuideProfessionSubjectCards;