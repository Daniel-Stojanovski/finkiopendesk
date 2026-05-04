export type SubjectNode = {
    id: string;
    label: string;

    instances?: {
        program: string;
        type: "MANDATORY" | "ELECTIVE" | "OTHER";
    }[];

    dependencyIds?: string[];
};

export interface Column {
    id: string;
    nodes: SubjectNode[];
}

export interface PositionedNode extends SubjectNode {
    x: number;
    y: number;
    columnIndex: number;
}

export interface Edge {
    from: string;
    to: string;
}