import './commentLoader.scss'

import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentItem from "../elements/CommentItem/CommentItem";
import type {DiscussionTypeKey} from "../../../shared/const/DiscussionTypeConst";
import {useEffect, useRef} from "react";
import {useAuth} from "../../../shared/AuthContext";

type CommentLoaderProps = {
    comments: CommentDto[];
    replyingTo: string | null;
    setParentCommentId: (id: string | null) => void;
    discussionType: DiscussionTypeKey;
};

const CommentLoader: React.FC<CommentLoaderProps> = ({ comments, replyingTo, setParentCommentId, discussionType }) => {
    const {user} = useAuth();

    const findParent = (parentId?: string) =>
        comments.find(c => c.commentId === parentId);

    const discussionEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        const el = discussionEndRef.current;
        if (!el) return;

        el.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [comments]);

    return (
        <>
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <CommentItem
                        key={comment.commentId}
                        comment={comment}
                        replyingTo={replyingTo}
                        setReply={setParentCommentId}
                        discussionType={discussionType}
                        parentComment={findParent(comment?.parentId?.toString())}
                    />
                ))
            ) : (
                user
                    ? <p className="cl-message">Be the one to encourage the discussion</p>
                    : <p className="cl-message">The discussion is empty</p>
            )}

            <span ref={discussionEndRef}></span>
        </>
    );
};

export default CommentLoader;