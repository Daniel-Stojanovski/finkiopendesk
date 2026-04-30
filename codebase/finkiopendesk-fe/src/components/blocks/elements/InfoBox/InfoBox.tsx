import './infoBox.scss';
import type {ProgramDto} from "../../../../shared/dto/ProgramDto";
import {useEffect, useState} from "react";
import type {ProfessionProgramDto} from "../../../../shared/dto/ProfessionProgramDto";
import {backapi} from "../../../../shared/axios";
import Spinner from "../../../utility/Spinner/Spinner";
import {useNavigate} from "react-router-dom";

type InfoBoxProps = {
    onClose: () => void;
    isOpen: boolean;
    object: ProgramDto | null;
};

const InfoBox: React.FC<InfoBoxProps> = ({ onClose, isOpen, object }) => {
    const navigate = useNavigate();

    const [coveredProfessions, setCoveredProfessions] = useState<ProfessionProgramDto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isOpen || !object?.programId) return;

        setLoading(true);

        backapi.get(`/profession-program/ppid/${object.programId}/applicable`)
            .then(res => {setCoveredProfessions(res.data);})
            .catch(err => {
                console.error("Failed to fetch program-covered professions:", err);
            })
            .finally(() => setLoading(false));

    }, [isOpen, object?.programId]);

    if (!isOpen || !object) return null;

    return (
        <>
            <div id='info-box'>
                <div className="info-box-header">
                    <div className="info-box-header-title">
                        <span className="type-label"><i className="bi bi-info-circle"></i> {object?.name}</span>
                        <h2>{object?.fullName}</h2>
                    </div>
                    <i className="bi bi-x-lg" onClick={onClose}></i>
                </div>

                <div className="info-box-content">
                    <span className="name-label">{object?.aliasFullNameEn}</span>
                    <p className="ibc-text">{object?.description}</p>

                    <h3>Coverage</h3>
                    {loading ? (
                        <Spinner size={3}/>
                    ) : (
                        <ul>
                            {coveredProfessions.length > 0 ? (
                                coveredProfessions.map(p => (
                                    <li key={p.professionId}>
                                        <p>{p.professionName}</p>
                                        <button onClick={() => {onClose(); navigate(`/subjects/pid/${p.professionId}`, {state: { tab: "roadmap" }})}}>
                                            See Roadmap <i className="bi bi-diagram-2 rotate-90-r scale-120"></i>
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li className="empty-message">No professions covered</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default InfoBox;