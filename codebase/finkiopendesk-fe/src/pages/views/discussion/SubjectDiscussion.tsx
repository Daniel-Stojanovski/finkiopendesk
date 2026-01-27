import { useEffect, useState } from "react";
import api from "../../../shared/axios";
import '../views.scss';
import {useParams} from "react-router-dom";
import ChannelSideBar from "../../../components/blocks/ChannelSidebar/ChannelSideBar";

const SubjectDiscussion = () => {
    const { id } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [channels, setChannels] = useState([]);

    const [isTabletOpen, setIsTabletOpen] = useState(false);
    const openTabletChannelSidebar = () => setIsTabletOpen(true);
    const closeTabletChannelSidebar = () => setIsTabletOpen(false);

    useEffect(() => {
        if (!id) return;
        api.get(`/subjects/sid/${id}`).then(response => setDiscussion(response.data));
    }, [id]);

    useEffect(() => {
        api.get(`/subjects/channels/sid/${id}/active`).then(response => setChannels(response.data));
    }, []);

    return (
        <div id="subject-discussion">
            <div className="discussion-view">
                <h3>{discussion?.name}</h3>
                {discussion?.description && (
                    <p>{discussion.description}</p>
                )}
            </div>

            <ChannelSideBar
                channels={channels}
                isTabletOpen={isTabletOpen}
                onOpenChannelSidebar={openTabletChannelSidebar}
                onCloseTablet={closeTabletChannelSidebar}/>
        </div>
    );
}

export default SubjectDiscussion;