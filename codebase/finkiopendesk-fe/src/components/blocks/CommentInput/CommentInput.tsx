import React, {useState} from "react";
import "./commentInput.scss";
// import {CommentTypeEnum} from "../../../shared/enums/CommentTypeEnum";
import {CommentType, type CommentTypeKey} from "../../../shared/const/CommentTypeConst";


const CommentInput: React.FC = () => {
    // const variants = Object.values(CommentTypeEnum);
    // const variants = Object.values(CommentType);
    const variants = Object.keys(CommentType) as CommentTypeKey[];
    const [selectedType, setSelectedType] = useState<CommentTypeKey>(CommentType.comment.value);
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!message.trim()) return;

        setMessage("");
    };

    return (
        <div id="comment-input-bar">
            <div className="cib-variants">
                {variants.map((variant: CommentTypeKey) => (
                    <button
                        key={variant}
                        type="button"
                        onClick={() => {
                            setSelectedType(variant);
                        }}
                    >
                        {CommentType[variant].value[0].toUpperCase()}
                    </button>
                ))}
            </div>

            <input className="cib-input"
                placeholder={CommentType[selectedType].message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <button className="cib-submit" onClick={handleSubmit}>
                Send
            </button>
        </div>
    );
};

export default CommentInput;
