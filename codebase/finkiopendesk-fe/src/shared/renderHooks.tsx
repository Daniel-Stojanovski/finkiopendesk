import type {CommentTypeKey} from "./const/CommentTypeConst";

export const useCommentTypeIcon = (type: CommentTypeKey) => {
    switch (type) {
        case "question":
            return <i className="bi bi-question-circle"></i>;
        case "important":
            return <i className="bi bi-exclamation-circle"></i>;
        // case "reply":
        //     return `<i className="bi bi-arrow-down-right-circle"></i>`;
        default:
            return <i className="bi bi-arrow-right-circle"></i>;
    }
}