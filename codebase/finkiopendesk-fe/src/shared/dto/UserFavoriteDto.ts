export interface UserFavoriteDto {
    targetId: string;
    targetType: "subject" | "profession";
    targetName?: string;
}