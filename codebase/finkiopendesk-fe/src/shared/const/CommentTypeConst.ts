export const CommentType = {
    comment: {
        value: "comment",
        message: "Message"
    },
    reply: {
        value: "reply",
        message: "Reply"
    },
    question: {
        value: "question",
        message: "Ask"
    },
    important: {
        value: "important",
        message: "Emphasize"
    }
} as const;

export type CommentTypeKey = keyof typeof CommentType;