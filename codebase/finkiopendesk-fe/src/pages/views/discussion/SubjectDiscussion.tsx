import { useEffect, useState } from "react";
import {backapi} from "../../../shared/axios";
import '../views.scss';
import {useOutletContext, useParams} from "react-router-dom";
import type {SubjectDiscussionDto} from "../../../shared/dto/SubjectDiscussionDto";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";
import CommentLoader from "../../../components/blocks/CommentLoader/CommentLoader";
import ChannelSideBar from "../../../components/blocks/ChannelSidebar/ChannelSideBar";
import {useNavigate} from "react-router-dom";
import {useBreakpoint} from "../../../shared/hooks";
import {DiscussionType} from "../../../shared/const/DiscussionTypeConst";

const SubjectDiscussion = () => {
    const { id } = useParams();
    const bp = useBreakpoint();

    const isViewSmall = (bp === "xs" || bp === "sm");
    const isViewMobile = (bp === "xs");

    const [discussion, setDiscussion] = useState<SubjectDiscussionDto | null>(null);
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [channels, setChannels] = useState<ChannelDto[]>([]);

    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

    const navigate = useNavigate();
    const { openSidebar } = useOutletContext<{ openSidebar: () => void }>();

    const [isTabletOpen, setIsTabletOpen] = useState(false);
    const openTabletChannelSidebar = () => setIsTabletOpen(true);
    const closeTabletChannelSidebar = () => setIsTabletOpen(false);

    useEffect(() => {
        if (!id) return;
        backapi.get<SubjectDiscussionDto>(`/subjects/sid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    useEffect(() => {
        backapi.get<ChannelDto[]>(`/subjects/channels/sid/${id}/active`).then(response => setChannels(response.data));
    }, []);

    useEffect(() => {
        backapi.get<CommentDto[]>(`/comments/sid/${id}`).then(response => setComments(response.data));
    }, []);

    return (
        <div id="subject-discussion">
            <div className="discussion-view">
                <div className="discussion-header">
                    {isViewMobile && (
                        <button onClick={openSidebar}>
                            <i className="bi bi-list" ></i>
                        </button>
                    )}

                    <h2 className="discussion-header-title">
                        <span className="type-label">Subject</span>
                        {discussion?.name}
                    </h2>

                    <i className="bi bi-x-lg" onClick={() => navigate("/discussions")}></i>
                    {isViewSmall && (!isTabletOpen && <i className="bi bi-diagram-3" onClick={openTabletChannelSidebar}></i>)}
                </div>
                <div className="discussion-comments-view">
                    {discussion?.description && (
                        <h3 className="discussion-description">Welcome to the {discussion.description}</h3>
                    )}
                    <CommentLoader comments={comments}
                                   replyingTo={selectedCommentId}
                                   setParentCommentId={setSelectedCommentId}
                                   discussionType={DiscussionType.SUBJECT}
                    />
                </div>
                <CommentInput
                    subjectId={id ?? undefined}
                    parentCommentId={selectedCommentId}
                    clearParent={() => setSelectedCommentId(null)}
                />
            </div>

            <ChannelSideBar
                channels={channels}
                isTabletOpen={isTabletOpen}
                onOpenChannelSidebar={openTabletChannelSidebar}
                onCloseTablet={closeTabletChannelSidebar}
            />
        </div>
    );
}

export default SubjectDiscussion;