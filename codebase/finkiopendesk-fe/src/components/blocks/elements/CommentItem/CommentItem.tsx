import React from "react";
import './commentItem.scss';
import type {CommentDto} from "../../../../shared/dto/CommentDto";

const CommentItem: React.FC<CommentDto> = (props) => {
    return (
        <div className="comment-item">
            {props.content && <p>{props.type}: {props.content}</p>}
        </div>
    );
}

export default CommentItem;