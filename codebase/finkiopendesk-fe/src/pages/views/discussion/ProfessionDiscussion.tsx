import { useEffect, useState } from "react";
import {api} from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";
import type {ProfessionDiscussionDto} from "../../../shared/dto/ProfessionDiscussionDto";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";
import CommentLoader from "../../../components/blocks/CommentLoader/CommentLoader";

const ProfessionDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState<ProfessionDiscussionDto | null>(null);
    const [comments, setComments] = useState<CommentDto[]>([]);

    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        api.get<ProfessionDiscussionDto>(`/professions/pid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    useEffect(() => {
        api.get<CommentDto[]>(`/comments/pid/${id}`).then(response => setComments(response.data));
    }, []);

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
                    <CommentLoader comments={comments}
                                   setParentCommentId={setSelectedCommentId}
                    />
                </div>
                <CommentInput
                    professionId={id ?? undefined}
                    parentCommentId={selectedCommentId}
                    clearParent={() => setSelectedCommentId(null)}
                />
            </div>
        </div>
    );
}

export default ProfessionDiscussion;