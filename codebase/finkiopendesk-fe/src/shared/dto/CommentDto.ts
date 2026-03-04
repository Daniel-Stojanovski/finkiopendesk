import type {CommentTypeKey} from "../const/CommentTypeConst";
import type {UserDto} from "./UserDto";

export interface CommentDto {
    commentId: string;
    user: UserDto;
    type: CommentTypeKey;
    content: string;
    subjectId?: string | null;
    professionId?: string | null;
    channelId?: string | null;
    parentId?: string | null;
}
