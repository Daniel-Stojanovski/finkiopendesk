import '../views.scss';
import Diagram from "../../../components/utility/Diagram/Diagram";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useEffect, useMemo, useState} from "react";
import {backapi} from "../../../shared/axios";
import type {ProgramSubjectDto} from "../../../shared/dto/ProgramSubjectDto";
import Spinner from "../../../components/utility/Spinner/Spinner";
import type {Column} from "../../../components/utility/Diagram/diagramTypes";

interface GuideProfessionRoadmapProps {
    profession: ProfessionDto | null;
    loading: boolean;
    selectedProgramOption: string;
}

const GuideProfessionRoadmap: React.FC<GuideProfessionRoadmapProps> = ({ profession, loading, selectedProgramOption }) => {

    const [programSubjects, setProgramSubjects] = useState<ProgramSubjectDto[]>([]);

    useEffect(() => {
        if (!profession?.professionId) return;

        const fetchSubjects = async () => {
            try {
                await backapi.get(`/program-subjects/pid/${profession.professionId}`)
                    .then(res => setProgramSubjects(res.data));
            } catch (e) {
                console.error(e);
            }
        };

        fetchSubjects();
    }, [profession, selectedProgramOption]);

    const filteredProgramSubjects = useMemo(() => {
        return programSubjects.filter(ps => ps.type === "MANDATORY" || ps.type === "ELECTIVE")
            .filter(ps => selectedProgramOption ? ps.programName === selectedProgramOption : true);
    }, [programSubjects]);

    //DIAGRAM
    const columns: Column[] = useMemo(() => {
        if (!filteredProgramSubjects.length) return [];

        const getLevel = (ps: ProgramSubjectDto): "L1" | "L2" | "L3" => {
            const h = ps.subject.tags?.[0]?.tag?.hardness;
            if (h === "L1" || h === "L2" || h === "L3") return h;
            return "L1";
        };

        const getSeason = (ps: ProgramSubjectDto): "W" | "S" => {
            const s = ps.subject.tags?.[0]?.tag?.semesterType;
            if (s === "W" || s === "S") return s;
            return "W";
        };

        const group: Record<
            "L1" | "L2" | "L3",
            Record<"W" | "S", ProgramSubjectDto[]>
            > = {
            L1: { W: [], S: [] },
            L2: { W: [], S: [] },
            L3: { W: [], S: [] }
        };

        const sortedSubjects = [...filteredProgramSubjects].sort((a, b) => {
            if (a.type === "MANDATORY" && b.type !== "MANDATORY") return -1;
            if (a.type !== "MANDATORY" && b.type === "MANDATORY") return 1;
            return 0;
        });

        sortedSubjects.forEach(ps => {
            group[getLevel(ps)][getSeason(ps)].push(ps);
        });

        const groupBySubject = (items: ProgramSubjectDto[]) => {
            return items.reduce<Record<string, ProgramSubjectDto[]>>((acc, ps) => {
                const key = ps.subject.subjectId;
                if (!acc[key]) acc[key] = [];
                acc[key].push(ps);
                return acc;
            }, {});
        };

        const mapNode = (psList: ProgramSubjectDto[]) => {
            const first = psList[0];

            return {
                id: first.subject.subjectId,
                label: first.subject.name,

                dependencyIds: Array.from(
                    new Set(
                        psList.flatMap(ps =>
                            (ps.dependencies ?? []).map(d => d.subject.subjectId)
                        )
                    )
                ),

                instances: psList.map(ps => ({
                    program: ps.programName,
                    type: ps.type
                }))
            };
        };

        const buildNodes = (items: ProgramSubjectDto[]) =>
            Object.values(groupBySubject(items)).map(mapNode);

        return [
            {
                id: "L1-W",
                level: "L1",
                season: "W",
                nodes: buildNodes(group.L1.W)
            },
            {
                id: "L1-S",
                level: "L1",
                season: "S",
                nodes: buildNodes(group.L1.S)
            },
            {
                id: "L2-W",
                level: "L2",
                season: "W",
                nodes: buildNodes(group.L2.W)
            },
            {
                id: "L2-S",
                level: "L2",
                season: "S",
                nodes: buildNodes(group.L2.S)
            },
            {
                id: "L3-W",
                level: "L3",
                season: "W",
                nodes: buildNodes(group.L3.W)
            },
            {
                id: "L3-S",
                level: "L3",
                season: "S",
                nodes: buildNodes(group.L3.S)
            }
        ];
    }, [filteredProgramSubjects]);
    //END DIAGRAM

    if (loading) return <Spinner size={2} />;

    return (
        <div className="gpv-roadmap-content">
            <div className="roadmap-wrapper">
                <Diagram columns={columns} />
            </div>
        </div>
    );
};

export default GuideProfessionRoadmap;