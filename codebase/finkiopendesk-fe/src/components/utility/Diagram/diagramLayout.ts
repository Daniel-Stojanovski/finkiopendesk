import { type Column, type PositionedNode, type Edge } from "./diagramTypes";

export type LayoutConfig = {
    nodeWidth: number;
    nodeHeight: number;
    horizontalGap: number;
    verticalGap: number;
    sidePadding: number;
    topPadding: number;
};

export function layoutColumns(
    columns: Column[],
    config: LayoutConfig
): PositionedNode[] {
    const {
        nodeWidth,
        nodeHeight,
        horizontalGap,
        verticalGap,
        sidePadding,
        topPadding,
    } = config;

    const positioned: PositionedNode[] = [];

    columns.forEach((col, colIndex) => {
        const startY = topPadding;

        col.nodes.forEach((node, i) => {
            positioned.push({
                ...node,
                columnIndex: colIndex,
                x: colIndex * (nodeWidth + horizontalGap) + sidePadding,
                y: startY + i * (nodeHeight + verticalGap),
            });
        });
    });

    return positioned;
}

export function generateEdges(nodes: PositionedNode[]): Edge[] {
    const edges: Edge[] = [];

    const subjectMap: Record<string, string[]> = {};

    nodes.forEach(node => {
        if (!node.subjectId) return;

        if (!subjectMap[node.subjectId]) {
            subjectMap[node.subjectId] = [];
        }

        subjectMap[node.subjectId].push(node.id);
    });

    nodes.forEach(node => {
        if (!node.dependencies?.length) return;

        node.dependencies.forEach(depSubjectId => {
            const fromNodes = subjectMap[depSubjectId];
            const toNodeId = node.id;

            if (!fromNodes) return;

            fromNodes.forEach(fromNodeId => {
                edges.push({
                    from: fromNodeId,
                    to: toNodeId,
                });
            });
        });
    });

    const unique = new Map<string, Edge>();

    edges.forEach(edge => {
        const key = `${edge.from}->${edge.to}`;
        unique.set(key, edge);
    });

    return Array.from(unique.values());
}

// export function generateEdges(nodes: PositionedNode[]): Edge[] {
//     const edges: Edge[] = [];
//
//     const nodeIds = new Set(nodes.map(n => n.id));
//
//     nodes.forEach(node => {
//         node.dependencies?.forEach(dep => {
//             if (!nodeIds.has(dep)) return;
//             edges.push({ from: dep, to: node.id });
//         });
//     });
//
//     return edges;
// }

export function createPath(
    from: PositionedNode,
    to: PositionedNode,
    config: LayoutConfig
) {
    const fromX = from.x + config.nodeWidth;
    const fromY = from.y + config.nodeHeight / 2;

    const toX = to.x;
    const toY = to.y + config.nodeHeight / 2;

    const midX = (fromX + toX) / 2;

    return `
        M ${fromX} ${fromY}
        C ${midX} ${fromY},
          ${midX} ${toY},
          ${toX} ${toY}
    `;
}

export function calculateBounds(
    nodes: PositionedNode[],
    config: LayoutConfig
) {
    const { nodeWidth, nodeHeight, sidePadding } = config;

    let maxX = 0;
    let maxY = 0;

    nodes.forEach(n => {
        maxX = Math.max(maxX, n.x + nodeWidth);
        maxY = Math.max(maxY, n.y + nodeHeight);
    });

    return {
        width: maxX + sidePadding,
        height: maxY + sidePadding,
    };
}