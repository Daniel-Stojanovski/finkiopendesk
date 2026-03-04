import React from "react";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentItem from "../elements/CommentItem/CommentItem";

type CommentLoaderProps = {
    comments: CommentDto[];
    setParentCommentId: (id: string) => void;
};

const CommentLoader: React.FC<CommentLoaderProps> = ({ comments, setParentCommentId }) => {
    return (
        <>
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <CommentItem
                        key={comment.commentId}
                        comment={comment}
                        setReply={setParentCommentId}
                    />
                ))
            ) : (
                <p>- Discussion is empty -</p>
            )}
        </>
    );
};

export default CommentLoader;