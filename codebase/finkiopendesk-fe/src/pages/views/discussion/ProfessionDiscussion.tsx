import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";
import type {ProfessionDiscussionDto} from "../../../shared/dto/ProfessionDiscussionDto";

const ProfessionDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState<ProfessionDiscussionDto | null>(null);

    useEffect(() => {
        if (!id) return;
        api.get<ProfessionDiscussionDto>(`/professions/pid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    return (
        <div className="discussion-view">
            <h3>{discussion?.name}</h3>
            {discussion?.description && (
                <p>{discussion.description}</p>
            )}
        </div>
    );
}

export default ProfessionDiscussion;