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

    const flatColumns: Column[] = useMemo(() => {
        return [{
            id: "Subjects",
            nodes: columns.flatMap(col => col.nodes),
        }];
    }, [columns]);

    const config: LayoutConfig = useMemo(() => {

        const sidePadding = 20;
        const horizontalGap = 0;

        const availableWidth = Math.max(
            0,
            containerWidth - sidePadding * 2
        );

        const nodeWidth = Math.max(120, availableWidth);

        return {
            nodeWidth,
            nodeHeight: 32,
            horizontalGap,
            verticalGap: 18,
            sidePadding,
            topPadding: 40,
        };
    }, [containerWidth]);

    const nodes = useMemo(
        () => layoutColumns(flatColumns, config),
        [flatColumns, config]
    );

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
                    {edges.map((edge, i) => {
                        const from = nodeMap[edge.from];
                        const to = nodeMap[edge.to];

                        if (!from || !to) return null;

                        return (
                            <path key={i}
                                d={createPath(from, to, config)}
                                stroke="#888785"
                                strokeWidth={1}
                                fill="none"
                            />
                        );
                    })}
                </svg>

                <div className="column-title"
                    style={{
                        left: config.sidePadding,
                        width: config.nodeWidth,
                    }}>
                    Subject Roadmap
                </div>

                {nodes.map(node => (
                    <div key={node.id}
                        className="node"
                        style={{
                            left: node.x,
                            top: node.y,
                            width: config.nodeWidth,
                            height: config.nodeHeight,
                        }}>
                        {node.program && node.type && (
                            <div className={`node-tag ${node.type.toLowerCase()}`}>
                                {node.program}/
                                {node.type === "MANDATORY"
                                    ? "Mandatory"
                                    : "Elective"}
                            </div>
                        )}

                        <div className="node-label">
                            {node.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Diagram;