import { useEffect, useState } from "react";
import {useOutletContext} from "react-router-dom";
import {api, backapi} from "../../../shared/axios";
import '../views.scss';
import ProfessionCard from "../../../components/blocks/ProfessionCard/ProfessionCard";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";

const GuideProfessionCards = () => {
    const [professions, setProfessions] = useState<ProfessionDto[]>([]);
    const [selectedProgramOption, setSelectedProgramOption] = useState<string | null>(null);

    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    const programs = ["SIIS", "SEIS", "IMB", "PIT", "IE", "KI", "KN", "SSP"];

    useEffect(() => {
        if (!searchQuery?.trim()) {
            api.get<ProfessionDto[]>("/professions").then(res => setProfessions(res.data));
            return;
        }

        const fetchSearch = async () => {
            try {
                await Promise.all([
                    backapi.get<ProfessionDto[]>('/professions', {params: { query: searchQuery || undefined }})
                        .then(res => setProfessions(res.data))
                ]);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSearch();

    }, [searchQuery]);

    const filteredProfessions = professions.filter(profession => {
        if (!selectedProgramOption) return true;

        return profession.programs?.some(pp =>
            pp.name === selectedProgramOption
        );
    });

    return (
        <>
            <div id="guide-profession-cards">
                <div className="gpc-program-pills">
                    {/*<span><i className="bi bi-sliders2"></i> Filter: </span>*/}
                    <span><i className="bi bi-sliders2"></i></span>
                    <span className={`pill ${selectedProgramOption === null ? "active" : ""}`} onClick={() => setSelectedProgramOption(null)}>
                        None
                    </span>

                    {programs.map(program => (
                        <span key={program} className={`pill ${selectedProgramOption === program ? "active" : ""}`}
                              onClick={() => setSelectedProgramOption(program)}>
                            {program}
                        </span>
                    ))}
                </div>

                {filteredProfessions.length == 0 ? (
                    <p className="empty-message">No subjects found.</p>
                ) : (
                    <div id="professions-grid">
                        {filteredProfessions.map(profession => (
                            <ProfessionCard
                                key={profession.professionId}
                                profession={profession}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default GuideProfessionCards;