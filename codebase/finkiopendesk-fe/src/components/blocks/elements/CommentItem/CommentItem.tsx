import React from "react";
import './commentItem.scss';
import type {CommentDto} from "../../../../shared/dto/CommentDto";

type CommentItemProps = {
    comment: CommentDto;
    setReply: (commentId: string) => void;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, setReply }) => {
    return (
        <div className="comment-item">
            <div className="ci-header">
                <p className="ci-user">
                    {comment.user.email}
                    <span> • {comment.type.toLowerCase()}</span>
                    {comment.parentId && <span>| {comment.parentId}</span>}
                </p>

                <span className="ci-reply-btn" onClick={() => setReply(comment.commentId)}>
                    Reply
                </span>
            </div>

            <p>{comment.content}</p>
        </div>
    );
};

export default CommentItem;