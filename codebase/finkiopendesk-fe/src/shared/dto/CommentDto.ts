import type {CommentTypeKey} from "../const/CommentTypeConst";

export interface CommentDto {
    type: CommentTypeKey;
    content: string;
    subjectId?: string | null;
    professionId?: string | null;
    channelId?: string | null;
}