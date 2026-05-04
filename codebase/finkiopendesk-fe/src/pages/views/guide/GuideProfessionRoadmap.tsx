import '../views.scss';
import Diagram from "../../../components/utility/Diagram/Diagram";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useEffect, useMemo, useState} from "react";
import {backapi} from "../../../shared/axios";
import type {ProgramSubjectDto} from "../../../shared/dto/ProgramSubjectDto";

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

        const grouped: Record<string, ProgramSubjectDto[]> = {};

        filteredProgramSubjects.forEach(ps => {
            if (!grouped[ps.programId]) {
                grouped[ps.programId] = [];
            }
            grouped[ps.programId].push(ps);
        });

        return Object.entries(grouped).map(([programId, subjects]) => ({
            id: subjects[0]?.programName || programId,
            nodes: subjects.map(ps => ({
                id: `${ps.subject.subjectId}_${ps.programId}_${ps.type}`,
                label: ps.subject.name,
                type: ps.type,
                program: ps.programName
            }))
        }));
    }, [programSubjects]);
    //END DIAGRAM

    if (loading) return <p>Loading...</p>;

    return (
        <div className="gpv-roadmap-content">
            <div className="roadmap-wrapper">
                <Diagram columns={columns} />
            </div>
        </div>
    );
};

export default GuideProfessionRoadmap;