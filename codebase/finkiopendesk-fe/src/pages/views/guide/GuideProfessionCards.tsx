import { useEffect, useState } from "react";
import {Link, useOutletContext} from "react-router-dom";
import {api, backapi} from "../../../shared/axios";
import '../views.scss'
import ProfessionCard from "../../../components/blocks/ProfessionCard/ProfessionCard";
import type {ProfessionDto} from "../../../shared/dto/ProfessionDto";

const GuideProfessionCards = () => {
    const [professions, setProfessions] = useState<ProfessionDto[]>([]);

    const { searchQuery } = useOutletContext<{ searchQuery: string }>();

    useEffect(() => {
        if (!searchQuery) {
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