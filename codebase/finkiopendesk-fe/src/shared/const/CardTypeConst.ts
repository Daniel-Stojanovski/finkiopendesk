export const CardType = {
    CARD: "CARD",
    VOTE: "VOTE"
} as const;

export type CardTypeKey = keyof typeof CardType;