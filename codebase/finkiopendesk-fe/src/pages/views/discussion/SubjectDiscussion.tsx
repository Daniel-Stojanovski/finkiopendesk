import { useEffect, useState } from "react";
import {api} from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";
import type {SubjectDiscussionDto} from "../../../shared/dto/SubjectDiscussionDto";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";
import CommentLoader from "../../../components/blocks/CommentLoader/CommentLoader";
import ChannelSideBar from "../../../components/blocks/ChannelSidebar/ChannelSideBar";

const SubjectDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState<SubjectDiscussionDto | null>(null);
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [channels, setChannels] = useState<ChannelDto[]>([]);

    const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

    const [isTabletOpen, setIsTabletOpen] = useState(false);
    const openTabletChannelSidebar = () => setIsTabletOpen(true);
    const closeTabletChannelSidebar = () => setIsTabletOpen(false);

    useEffect(() => {
        if (!id) return;
        api.get<SubjectDiscussionDto>(`/subjects/sid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    useEffect(() => {
        api.get<ChannelDto[]>(`/subjects/channels/sid/${id}/active`).then(response => setChannels(response.data));
    }, []);

    useEffect(() => {
        api.get<CommentDto[]>(`/comments/sid/${id}`).then(response => setComments(response.data));
    }, []);

    return (
        <div id="subject-discussion">
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