import type {CommentTypeKey} from "../const/CommentTypeConst";
import type {UserDto} from "./UserDto";

export interface CommentDto {
    user: UserDto;
    type: CommentTypeKey;
    content: string;
    subjectId?: string | null;
    professionId?: string | null;
    channelId?: string | null;
}