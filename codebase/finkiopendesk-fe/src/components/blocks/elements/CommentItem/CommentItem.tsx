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
            <div>
                <p className="ci-user">
                    {comment.user.email}
                    <span> • {comment.type.toLowerCase()}</span>
                    {comment.parentId && <span>| {comment.parentId}</span>}
                </p>

                <button onClick={() => {setReply(comment.commentId); console.log("Reply clicked:", comment.commentId);}}>
                    Reply
                </button>
            </div>

            <p>{comment.content}</p>
        </div>
    );
};

export default CommentItem;