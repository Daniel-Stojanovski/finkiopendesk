import { useEffect, useState } from "react";
import {backapi} from "../../../shared/axios";
import '../views.scss';
import {useOutletContext, useParams} from "react-router-dom";
import type {ProfessionDiscussionDto} from "../../../shared/dto/ProfessionDiscussionDto";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";
import CommentLoader from "../../../components/blocks/CommentLoader/CommentLoader";
import {useNavigate} from "react-router-dom";
import {useBreakpoint} from "../../../shared/hooks";
import {DiscussionType} from "../../../shared/const/DiscussionTypeConst";

const ProfessionDiscussion = () => {
    const { id } = useParams();
    const bp = useBreakpoint();

    const isViewMobile = (bp === "xs");

    const [discussion, setDiscussion] = useState<ProfessionDiscussionDto | null>(null);
    const [comments, setComments] = useState<CommentDto[]>([]);

    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

    const navigate = useNavigate();
    const { openSidebar } = useOutletContext<{ openSidebar: () => void }>();

    useEffect(() => {
        if (!id) return;
        backapi.get<ProfessionDiscussionDto>(`/professions/pid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    useEffect(() => {
        backapi.get<CommentDto[]>(`/comments/pid/${id}`).then(response => setComments(response.data));
    }, []);

    return (
        <div id="profession-discussion">
            <div className="discussion-view">
                <div className="discussion-header">
                    {isViewMobile && (
                        <button onClick={openSidebar}>
                            <i className="bi bi-list" ></i>
                        </button>
                    )}

                    <h2 className="discussion-header-title">
                        <span className="type-label">Profession</span>
                        {discussion?.name}
                    </h2>

                    <i className="bi bi-x-lg" onClick={() => navigate("/discussions")}></i>
                </div>
                <div className="discussion-comments-view">
                    {discussion?.description && (
                        <h3 className="discussion-description">Welcome to the {discussion.description}</h3>
                    )}
                    <CommentLoader comments={comments}
                                   replyingTo={selectedCommentId}
                                   setParentCommentId={setSelectedCommentId}
                                   discussionType={DiscussionType.PROFESSION}
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