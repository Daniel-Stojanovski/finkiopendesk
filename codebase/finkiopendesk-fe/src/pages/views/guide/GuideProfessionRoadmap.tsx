import '../views.scss';
import Diagram from "../../../components/utility/Diagram/Diagram";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useEffect, useMemo, useState} from "react";
import {backapi} from "../../../shared/axios";
import type {ProgramSubjectDto} from "../../../shared/dto/ProgramSubjectDto";
import Spinner from "../../../components/utility/Spinner/Spinner";

interface GuideProfessionRoadmapProps {
    profession: ProfessionDto | null;
    loading: boolean;
}

const GuideProfessionRoadmap: React.FC<GuideProfessionRoadmapProps> = ({ profession, loading }) => {

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
    }, [profession]);

    const filteredProgramSubjects = useMemo(() => {
        return programSubjects.filter(ps => ps.type === "MANDATORY" || ps.type === "ELECTIVE");
    }, [programSubjects]);

    //DIAGRAM
    const columns = useMemo(() => {
        if (!filteredProgramSubjects.length) return [];

        const grouped: Record<string, ProgramSubjectDto[]> = {L1: [], L2: [], L3: []};

        const getLevel = (ps: ProgramSubjectDto): "L1" | "L2" | "L3" => {
            return (
                ps.subject.tags?.[0]?.tag?.hardness as "L1" | "L2" | "L3"
            ) || "L1";
        };

        filteredProgramSubjects.forEach(ps => {
            grouped[getLevel(ps)].push(ps);
        });

        const mapNode = (psList: ProgramSubjectDto[]) => {
            const first = psList[0];

            return {
                id: first.subject.subjectId,
                label: first.subject.name,

                program: "",

                type: undefined,

                dependencyIds: Array.from(
                    new Set(
                        psList.flatMap(ps =>
                            (ps.dependencies ?? [])
                                .map(d => d.subject.subjectId)
                        )
                    )
                ),

                instances: psList.map(ps => ({
                    program: ps.programName,
                    type: ps.type
                }))
            };
        };

        const groupBySubject = (items: ProgramSubjectDto[]) => {
            return items.reduce<Record<string, ProgramSubjectDto[]>>((acc, ps) => {
                const key = ps.subject.subjectId;

                if (!acc[key]) acc[key] = [];
                acc[key].push(ps);

                return acc;
            }, {});
        };

        const buildColumn = (items: ProgramSubjectDto[]) => {
            const grouped = groupBySubject(items);

            return Object.values(grouped).map(mapNode);
        };

        return [
            {
                id: "L1",
                nodes: buildColumn(grouped.L1)
            },
            {
                id: "L2",
                nodes: buildColumn(grouped.L2)
            },
            {
                id: "L3",
                nodes: buildColumn(grouped.L3)
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