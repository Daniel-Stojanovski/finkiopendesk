import React from "react";
import './commentItem.scss';
import type {CommentDto} from "../../../../shared/dto/CommentDto";
import type {CommentTypeKey} from "../../../../shared/const/CommentTypeConst";
import {useCommentTypeIcon} from "../../../../shared/renderHooks";
import {useAuth} from "../../../../shared/AuthContext";
import type {DiscussionTypeKey} from "../../../../shared/const/DiscussionTypeConst";
import {DiscussionType} from "../../../../shared/const/DiscussionTypeConst";

type CommentItemProps = {
    comment: CommentDto;
    replyingTo: string | null;
    setReply: (commentId: string | null) => void;
    discussionType: DiscussionTypeKey;
    parentComment?: CommentDto;
};

const CommentItem: React.FC<CommentItemProps> = ({ comment, replyingTo, setReply, discussionType , parentComment}) => {
    const { user } = useAuth();

    const canUserReply =
        user && (
            discussionType == DiscussionType.PROFESSION ||
            (user.student && (discussionType == DiscussionType.SUBJECT || discussionType == DiscussionType.CHANNEL))
        );

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
                        {/*<span>{comment.user.student ? 'student' : 'guest'}</span>*/}
                        {comment.parentId && <sub>Replied to {parentComment?.user?.email.toString().split("@")[0]}'s: {parentComment?.content}</sub>}
                    </p>
                </>

                { canUserReply &&
                    <span className={`ci-reply-btn ${isReplying ? "active" : ""}`} onClick={handleReplyClick}>
                        {isReplying ? (<>Replying <i className="bi bi-x"></i></>) : 'Reply'}
                    </span>
                }
            </div>
            <p className="ci-content">{comment.content}</p>
        </div>
    );
};

export default CommentItem;