import "./diagram.scss";
import { useMemo, useRef, useEffect, useState } from "react";
import { type Column, type PositionedNode } from "./diagramTypes";
import {layoutColumns, generateEdges, createPath, calculateBounds, type LayoutConfig} from "./diagramLayout";

type DiagramProps = {
    columns: Column[];
};

const Diagram: React.FC<DiagramProps> = ({ columns }) => {

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const updateWidth = () => {
            const width = el.clientWidth;
            if (width > 0) {
                setContainerWidth(width);
            }
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });

        resizeObserver.observe(el);

        return () => resizeObserver.disconnect();
    }, []);

    const config: LayoutConfig = useMemo(() => {
        const columnCount = columns.length;

        const sidePadding = 10;
        const horizontalGap = 40;

        const availableWidth = Math.max(
            0,
            containerWidth -
            sidePadding * 2 -
            horizontalGap * (columnCount - 1)
        );

        const nodeWidth = Math.max(80, (availableWidth / columnCount));

        return {
            nodeWidth,
            nodeHeight: 28,
            horizontalGap,
            verticalGap: 20,
            sidePadding,
            topPadding: 50,
        };
    }, [containerWidth, columns.length]);

    const nodes = useMemo(() => layoutColumns(columns, config), [columns, config]);
    const edges = useMemo(() => generateEdges(nodes), [nodes]);

    const nodeMap = useMemo(() => {
        const map: Record<string, PositionedNode> = {};
        nodes.forEach(n => (map[n.id] = n));
        return map;
    }, [nodes]);

    const bounds = useMemo(() => calculateBounds(nodes, config), [nodes, config]);

    if (containerWidth === 0) {
        return <div ref={containerRef} id="diagram" />;
    }

    return (
        <div ref={containerRef} id="diagram">
            <div
                className="diagram-container"
                style={{
                    width: bounds.width,
                    height: bounds.height,
                }}
            >
                <svg
                    width={bounds.width}
                    height={bounds.height}
                    className="svg-layer"
                >
                    {edges.map((edge, i) => {
                        const from = nodeMap[edge.from];
                        const to = nodeMap[edge.to];
                        if (!from || !to) return null;

                        return (
                            <path
                                key={i}
                                d={createPath(from, to, config)}
                                stroke="#888785"
                                strokeWidth={1}
                                fill="none"
                            />
                        );
                    })}
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
                        {col.id}
                    </div>
                ))}

                {nodes.map(node => (
                    <div key={node.id} className="node"
                        style={{
                            left: node.x,
                            top: node.y,
                            width: config.nodeWidth,
                            height: config.nodeHeight,
                        }}
                    >
                        {node.type && (
                            <div className={`node-tag ${node.type === "mandatory" ? 'mandatory' : 'elective'}`}>
                                {node.type === "mandatory" ? "Mandatory" : "Elective"}
                            </div>
                        )}

                        {node.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Diagram;