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
                season: col.season,
                level: col.level,
                x: colIndex * (nodeWidth + horizontalGap) + sidePadding,
                y: startY + i * (nodeHeight + verticalGap),
            });
        });
    });

    return positioned;
}

export function generateEdges(nodes: PositionedNode[]): Edge[] {
    const edges: Edge[] = [];

    const nodeMap = new Map<string, PositionedNode>();
    nodes.forEach(n => nodeMap.set(n.id, n));

    for (const node of nodes) {
        for (const depId of node.dependencyIds ?? []) {
            const from = nodeMap.get(depId);
            const to = node;

            if (!from || !to) continue;

            if (from.level && to.level && from.level === to.level) {
                continue;
            }

            edges.push({
                from: depId,
                to: node.id
            });
        }
    }

    return edges;
}

export function createPath(
    from: PositionedNode,
    to: PositionedNode,
    config: LayoutConfig
) {
    const fromCenterY = from.y + config.nodeHeight / 2;
    const toCenterY = to.y + config.nodeHeight / 2;

    const isLeftToRight = from.columnIndex < to.columnIndex;

    const fromX = isLeftToRight
        ? from.x + config.nodeWidth
        : from.x;

    const toX = isLeftToRight
        ? to.x
        : to.x + config.nodeWidth;

    const midX = (fromX + toX) / 2;

    return `
        M ${fromX} ${fromCenterY}
        C ${midX} ${fromCenterY},
          ${midX} ${toCenterY},
          ${toX} ${toCenterY}
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