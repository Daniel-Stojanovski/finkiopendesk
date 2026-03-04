import React from "react";
import './commentItem.scss';
import type {CommentDto} from "../../../../shared/dto/CommentDto";

type CommentItemProps = {
    comment: CommentDto;
    replyingTo: string | null;
    setReply: (commentId: string | null) => void;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, replyingTo, setReply }) => {
    const isReplying = (replyingTo === comment.commentId);

    const handleReplyClick = () => {
        if (isReplying) setReply(null);
        else setReply(comment.commentId);
    };

    return (
        <div className={`comment-item ${isReplying ? "active" : ""}`}>
            <div className="ci-header">
                <p className="ci-user">
                    {comment.user.email}
                    <span> • {comment.type.toLowerCase()}</span>
                    {comment.parentId && <span>| {comment.parentId}</span>}
                </p>

                <span
                    className={`ci-reply-btn ${isReplying ? "active" : ""}`}
                    onClick={handleReplyClick}
                >
                    {isReplying ? "Replying [x]" : "Reply"}
                </span>
            </div>

            <p>{comment.content}</p>
        </div>
    );
};

export default CommentItem;