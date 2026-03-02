import { useEffect, useState } from "react";
import {api} from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";
import ChannelSideBar from "../../../components/blocks/ChannelSidebar/ChannelSideBar";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";
import type {SubjectDiscussionDto} from "../../../shared/dto/SubjectDiscussionDto";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentInput from "../../../components/blocks/CommentInput/CommentInput";
import CommentLoader from "../../../components/blocks/CommentLoader/CommentLoader";

const SubjectDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState<SubjectDiscussionDto | null>(null);
    const [channels, setChannels] = useState<ChannelDto[]>([]);
    const [comments, setComments] = useState<CommentDto[]>([
        { type: "comment", content: "This is mock comment." },
        { type: "reply", content: "This is mock reply comment." },
        { type: "important", content: "This is mock important comment." },
        { type: "question", content: "This is mock question comment." },
    ]);

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
                    test
                    <CommentLoader comments={comments}/>
                </div>
                <CommentInput
                    subjectId={id ?? undefined}
                />
            </div>

            <ChannelSideBar
                channels={channels}
                isTabletOpen={isTabletOpen}
                onOpenChannelSidebar={openTabletChannelSidebar}
                onCloseTablet={closeTabletChannelSidebar}/>
        </div>
    );
}

export default SubjectDiscussion;