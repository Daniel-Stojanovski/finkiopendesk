import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../shared/axios";
import '../views.scss'
import ProfessionCard from "../../../components/blocks/ProfessionCard/ProfessionCard";

const GuideProfessionCards = () => {
    const [professions, setProfessions] = useState([]);

    useEffect(() => {
        api.get("/professions")
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