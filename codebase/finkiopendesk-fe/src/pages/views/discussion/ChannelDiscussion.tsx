import { useEffect, useState } from "react";
import {api} from "../../../shared/axios";
import '../views.scss';
import {useOutletContext, useParams} from "react-router-dom";
import type {ChannelDiscussionDto} from "../../../shared/dto/ChannelDiscussionDto";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";
import CommentLoader from "../../../components/blocks/CommentLoader/CommentLoader";
import {useNavigate} from "react-router-dom";
import {useBreakpoint} from "../../../shared/hooks";
import {DiscussionType} from "../../../shared/const/DiscussionTypeConst";

const ChannelDiscussion = () => {
    const { id } = useParams();
    const bp = useBreakpoint();

    const isViewMobile = (bp === "xs");

    const [discussion, setDiscussion] = useState<ChannelDiscussionDto | null>(null);
    const [comments, setComments] = useState<CommentDto[]>([]);

    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

    const navigate = useNavigate();
    const { openSidebar } = useOutletContext<{ openSidebar: () => void }>();

    useEffect(() => {
        if (!id) return;
        api.get<ChannelDiscussionDto>(`/channels/cid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    useEffect(() => {
        api.get<CommentDto[]>(`/comments/cid/${id}`).then(response => setComments(response.data));
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
                    <div className="discussion-header-title">
                        <h3>{discussion?.name}</h3>
                        {discussion?.description && (
                            <p>{discussion.description}</p>
                        )}
                    </div>
                    <i className="bi bi-arrow-left lg" onClick={() => navigate(-1)}></i>
                </div>
                <div className="discussion-comments-view">
                    <CommentLoader comments={comments}
                                   replyingTo={selectedCommentId}
                                   setParentCommentId={setSelectedCommentId}
                                   discussionType={DiscussionType.CHANNEL}
                    />
                </div>
                <CommentInput
                    channelId={id ?? undefined}
                    parentCommentId={selectedCommentId}
                    clearParent={() => setSelectedCommentId(null)}
                />
            </div>
        </div>
    );
}

export default ChannelDiscussion;