import './professionCard.scss'
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";
import {useNavigate, useOutletContext} from "react-router-dom";
import {useUserData} from "../../../shared/UserDataContext";

interface ProfessionCardProps {
    profession: ProfessionDto;
}

const ProfessionCard: React.FC<ProfessionCardProps> = ({ profession }) => {
    const navigate = useNavigate();
    const { openInfoBox } = useOutletContext<any>();
    const { selectedUserProgram } = useUserData();

    return (
        <div className="profession-card">
            <div className="pc-header">
                <h3>{profession.name}</h3>
                <div className="pc-tags">
                    <span>Pursued in: </span>
                    {profession.programs?.map(pp => (
                        <p key={pp.programId} className={`tag-label ${selectedUserProgram?.name == pp.name ? 'preferred' : ''}`} onClick={() => openInfoBox(pp)}>#{pp.name}</p>
                    ))}
                </div>
            </div>
            {profession.description && <p>{profession.description}</p>}
            <div className="pc-buttons">
                <button onClick={() => navigate(`/subjects/pid/${profession.professionId}`, {state: { tab: "roadmap" }})}>See Roadmap <i className="bi bi-diagram-2 rotate-90-r scale-120"></i></button>
                <button onClick={() => navigate(`/subjects/pid/${profession.professionId}`, {state: { tab: "voting" }})}>See Votings <i className="bi bi-arrows-expand"></i></button>
            </div>
        </div>
    );
};

export default ProfessionCard;