import React from "react";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import CommentItem from "../elements/CommentItem/CommentItem";

type CommentLoaderProps = {
    comments: CommentDto[];
};

function loadComments(comments: CommentDto[]) {
    return (
        comments
            ? (comments.map(comment => <CommentItem type={comment.type} content={comment.content}/>))
            : (<p>- Discussion is empty -</p>)
    );
}

const CommentLoader: React.FC<CommentLoaderProps> = ({ comments }) => {
    return (
        <>
            {loadComments(comments)}
        </>
    )
};

export default CommentLoader;