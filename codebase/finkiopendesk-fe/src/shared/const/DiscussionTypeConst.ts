export const DiscussionType = {
    PROFESSION: "profession",
    SUBJECT: "subject",
    CHANNEL: "channel"
} as const;

export type DiscussionTypeKey = typeof DiscussionType[keyof typeof DiscussionType];