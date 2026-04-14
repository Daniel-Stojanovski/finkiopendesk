export interface UserFavoriteDto {
    targetId: string;
    targetType: "subject" | "profession" | "channel";
    targetName?: string;
}