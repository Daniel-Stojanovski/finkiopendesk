import "./diagram.scss";
import { useMemo, useRef, useEffect, useState } from "react";
import {type Column, type PositionedNode} from "./diagramTypes";
import {layoutColumns, generateEdges, createPath, calculateBounds, type LayoutConfig} from "./diagramLayout";

type DiagramProps = {
    columns: Column[];
};

const Diagram: React.FC<DiagramProps> = ({ columns }) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateWidth = () => {
            const width = el.clientWidth;
            if (width > 0) setContainerWidth(width);
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(el);

        return () => resizeObserver.disconnect();
    }, []);

    const config: LayoutConfig = useMemo(() => {
        const columnCount = columns.length;

        const sidePadding = 20;
        const horizontalGap = 50;

        if (columnCount === 0 || containerWidth === 0) {
            return {
                nodeWidth: 80,
                nodeHeight: 32,
                horizontalGap,
                verticalGap: 18,
                sidePadding,
                topPadding: 40,
            };
        }

        const availableWidth = Math.max(
            0,
            containerWidth - sidePadding * 2
        );

        const totalGapWidth = horizontalGap * (columnCount - 1);

        const nodeWidth = Math.max(
            120,
            (availableWidth - totalGapWidth) / columnCount
        );

        return {
            nodeWidth,
            nodeHeight: 32,
            horizontalGap,
            verticalGap: 18,
            sidePadding,
            topPadding: 40,
        };
    }, [containerWidth, columns.length]);

    const nodes = useMemo(() => {
        return layoutColumns(columns, config);
    }, [columns, config]);

    const edges = useMemo(
        () => generateEdges(nodes),
        [nodes]
    );

    const nodeMap = useMemo(() => {
        const map: Record<string, PositionedNode> = {};
        nodes.forEach(n => {
            map[n.id] = n;
        });
        return map;
    }, [nodes]);

    const bounds = useMemo(
        () => calculateBounds(nodes, config),
        [nodes, config]
    );

    const connectedNodeIds = useMemo(() => {
        if (!selectedNodeId) return new Set<string>();

        const connected = new Set<string>();
        connected.add(selectedNodeId);

        edges.forEach(edge => {
            if (edge.from === selectedNodeId) connected.add(edge.to);
            if (edge.to === selectedNodeId) connected.add(edge.from);
        });

        return connected;
    }, [selectedNodeId, edges]);

    if (containerWidth === 0) {
        return <div ref={containerRef} id="diagram" />;
    }

    return (
        <div ref={containerRef} id="diagram">
            <div className="diagram-container"
                style={{
                    width: bounds.width,
                    height: bounds.height,
                }}
            >
                <svg width={bounds.width}
                    height={bounds.height}
                    className="svg-layer"
                >
                    {edges
                        .map((edge, i) => {
                            const from = nodeMap[edge.from];
                            const to = nodeMap[edge.to];

                            if (!from || !to) return null;

                            const isConnected =
                                selectedNodeId &&
                                (edge.from === selectedNodeId ||
                                    edge.to === selectedNodeId);

                            return (
                                <path key={i}
                                    d={createPath(from, to, config)}
                                    stroke={selectedNodeId != null ? "#2a93d1" : "#888785"}
                                    opacity={!selectedNodeId ? 0.15 : isConnected ? 1 : 0}
                                    strokeWidth={1}
                                    fill="none"
                                />
                            );
                        }
                    )}
                </svg>

                {columns.map((col, i) => (
                    <div
                        key={col.id}
                        className="column-title"
                        style={{
                            left:
                                i * (config.nodeWidth + config.horizontalGap) +
                                config.sidePadding,
                            width: config.nodeWidth,
                        }}
                    >
                        {col.level} {col.season === "W" ? "Winter" : "Summer"}
                    </div>
                ))}

                {nodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isConnected = connectedNodeIds.has(node.id);

                    return (
                        <div key={node.id}
                            className="node"
                            onClick={() => setSelectedNodeId(prev => prev === node.id ? null : node.id)}
                            style={{
                                left: node.x,
                                top: node.y,
                                width: config.nodeWidth,
                                height: config.nodeHeight,
                                opacity: !selectedNodeId ? 1 : isConnected ? 1 : 0.2,
                                background: isSelected ? "#d8e8f2" : undefined,
                                outline: isSelected || isConnected ? "2px solid #2a93d1" : undefined,
                            }}>

                            {node.instances?.map((inst, i) => (
                                <div key={i} className={`node-tag ${inst.type.toLowerCase()}`}>
                                    {inst.program}/{inst.type === "MANDATORY" ? "Mandatory" : "Elective"}
                                </div>
                            ))}

                            <div className="node-label">
                                {node.label}
                            </div>
                        </div>
                    )}
                )}
            </div>
        </div>
    );
};

export default Diagram;