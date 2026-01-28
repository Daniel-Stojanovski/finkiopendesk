import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../shared/axios";
import '../views.scss'
import ProfessionCard from "../../../components/blocks/ProfessionCard/ProfessionCard";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";

const GuideProfessionCards = () => {
    const [professions, setProfessions] = useState<ProfessionDto[]>([]);

    useEffect(() => {
        api.get<ProfessionDto[]>("/professions")
            .then(response => {
                setProfessions(response.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <div id="professions-grid">
            {professions.map(profession => (
                <Link to={`/subjects/pid/${profession.professionId}`}>
                    <ProfessionCard
                        key={profession.professionId}
                        profession={profession}
                    />
                </Link>
            ))}
        </div>
    );
}

export default GuideProfessionCards;