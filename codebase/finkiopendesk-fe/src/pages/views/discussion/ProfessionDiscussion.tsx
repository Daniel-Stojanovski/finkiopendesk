import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";

const ProfessionDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState(null);

    useEffect(() => {
        if (!id) return;
        api.get(`/professions/pid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    return (
        <div className="discussion-view">
            <h3>{discussion?.name}</h3>
            {discussion?.description && (
                <p>{discussion.description}</p>
            )}
        </div>
    );
}

export default ProfessionDiscussion;