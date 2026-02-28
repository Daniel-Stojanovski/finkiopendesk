import React, { useState } from "react";
import "./commentInput.scss";
import {backapi} from '../../../shared/axios'
import { CommentType, type CommentTypeKey } from "../../../shared/const/CommentTypeConst";
import type {CommentDto} from "../../../shared/dto/CommentDto";
import {useKeyBind} from "../../../shared/hooks";

interface CommentInputProps {
    subjectId?: string;
    professionId?: string;
    channelId?: string;
    onCommentCreated?: (comment: any) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({ subjectId, professionId, channelId }) => {
    const variants = Object.keys(CommentType) as CommentTypeKey[];

    const [selectedType, setSelectedType] = useState<CommentTypeKey>(CommentType.comment.value);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (!message.trim()) return;

        try {
            await backapi.post<CommentDto>("/comments/create", {
                type: CommentType[selectedType].value.toUpperCase(),
                content: message,
                subjectId: subjectId ?? null,
                professionId: professionId ?? null,
                channelId: channelId ?? null,
            });

            setMessage("");
        } catch (error) {
            console.error("Failed to create comment:", error);
        }
    };

    return (
        <div id="comment-input-bar">
            <div className="cib-variants">
                {variants.map((variant: CommentTypeKey) => (
                    <button
                        key={variant}
                        type="button"
                        onClick={() => setSelectedType(variant)}
                    >
                        {variant[0]}
                    </button>
                ))}
            </div>

            <input className="cib-input"
                placeholder={CommentType[selectedType].message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={useKeyBind("Enter", handleSubmit)}
            />

            <button className="cib-submit" onClick={handleSubmit}>
                Send
            </button>
        </div>
    );
};

export default CommentInput;
