import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentItem from "../elements/CommentItem/CommentItem";
import type {DiscussionTypeKey} from "../../../shared/const/DiscussionTypeConst";

type CommentLoaderProps = {
    comments: CommentDto[];
    replyingTo: string | null;
    setParentCommentId: (id: string | null) => void;
    discussionType: DiscussionTypeKey;
};

const CommentLoader: React.FC<CommentLoaderProps> = ({ comments, replyingTo, setParentCommentId, discussionType }) => {
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
                    />
                ))
            ) : (
                <p>- Discussion is empty -</p>
            )}
        </>
    );
};

export default CommentLoader;