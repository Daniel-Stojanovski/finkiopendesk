import type { TagDto } from "./TagDto";

export interface SubjectTagDto {
    subjectTagId: string;
    statusActive: boolean;
    subjectId: string;
    tag: TagDto;
}