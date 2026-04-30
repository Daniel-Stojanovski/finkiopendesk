import '../views.scss';
import Diagram from "../../../components/utility/Diagram/Diagram";
import type {SubjectDto} from "../../../shared/dto/SubjectDto";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";

interface GuideProfessionRoadmapProps {
    subjects: SubjectDto[] | null;
    profession: ProfessionDto | null;
    loading: boolean;
}

const GuideProfessionRoadmap: React.FC<GuideProfessionRoadmapProps> = ({ subjects, profession, loading }) => {

    //DIAGRAM
    const columns = [
        {
            id: "Year 1",
            nodes: [
                { id: "math1", label: "Math 1", type: "mandatory" as const},
                { id: "cs1", label: "Intro CS" , type: "elective" as const},
                { id: "cs2", label: "Intro CS" },
                { id: "cs3", label: "Intro CS" },
                { id: "cs4", label: "Intro CS" },
            ],
        },
        {
            id: "Year 2",
            nodes: [
                { id: "math2", label: "Math 2", dependencies: ["math1"] },
                { id: "ds", label: "Data Structures", dependencies: ["cs1", "cs2", "cs3", "cs4"] },
            ],
        },
        {
            id: "Year 3",
            nodes: [
                {
                    id: "algo1",
                    label: "Algorithms",
                    dependencies: ["math2", "ds"],
                },
            ],
        },
        {
            id: "Year 4",
            nodes: [
                {
                    id: "algo2",
                    label: "Algorithms",
                    dependencies: ["algo1"],
                },
            ],
        },
    ];
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