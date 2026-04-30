export type SubjectNode = {
    id: string;
    label: string;
    type?: "mandatory" | "elective";
    dependencies?: string[];
}

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