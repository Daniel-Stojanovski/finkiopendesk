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
    level: "L1" | "L2" | "L3";
    season: "W" | "S";
    nodes: SubjectNode[];
}

export interface PositionedNode extends SubjectNode {
    x: number;
    y: number;
    columnIndex: number;
    level?: "L1" | "L2" | "L3";
    season?: "W" | "S";
}

export interface Edge {
    from: string;
    to: string;
}