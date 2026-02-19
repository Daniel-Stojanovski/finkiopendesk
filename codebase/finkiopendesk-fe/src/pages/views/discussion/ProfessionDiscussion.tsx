import { useEffect, useState } from "react";
import {api} from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";
import type {ProfessionDiscussionDto} from "../../../shared/dto/ProfessionDiscussionDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";

const ProfessionDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState<ProfessionDiscussionDto | null>(null);

    useEffect(() => {
        if (!id) return;
        api.get<ProfessionDiscussionDto>(`/professions/pid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    return (
        <div id="profession-discussion">
            <div className="discussion-view">
                <>
                    <h3>{discussion?.name}</h3>
                    {discussion?.description && (
                        <p>{discussion.description}</p>
                    )}
                </>
                <div className="discussion-comments-view">
                    test
                </div>
                <CommentInput/>
            </div>
        </div>
    );
}

export default ProfessionDiscussion;