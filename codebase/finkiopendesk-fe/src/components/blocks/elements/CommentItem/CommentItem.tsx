import React from "react";
import './commentItem.scss';
import type {CommentDto} from "../../../../shared/dto/CommentDto";
import type {CommentTypeKey} from "../../../../shared/const/CommentTypeConst";
import {useCommentTypeIcon} from "../../../../shared/renderHooks";

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
                <>
                    {useCommentTypeIcon(comment.type.toLowerCase() as CommentTypeKey)}
                    <p className="ci-user">
                        {comment.user.email.split("@")[0]}
                        <span>{comment.user.student ? 'student' : 'guest'}</span>
                    </p>
                </>

                <span className={`ci-reply-btn ${isReplying ? "active" : ""}`} onClick={handleReplyClick}>
                    {isReplying ? (<>Replying <i className="bi bi-x"></i></>) : 'Reply'}
                </span>
            </div>
            <p>{comment.content}</p>
        </div>
    );
};

export default CommentItem;