import React from "react";
import './commentItem.scss';
import type {CommentDto} from "../../../../shared/dto/CommentDto";

const CommentItem: React.FC<CommentDto> = (props) => {
    return (
        <div className="comment-item">
            <p className="ci-user">{props.user.email} <span>• {props.type.toLowerCase()}</span></p>
            <p>{props.content}</p>
        </div>
    );
}

export default CommentItem;