import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss'
import ProfessionCard from "../../../components/blocks/ProfessionCard";

const GuideAllCards = () => {
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
                <ProfessionCard
                    key={profession.professionId}
                    profession={profession}
                />
            ))}
        </div>
    );
}

export default GuideAllCards;