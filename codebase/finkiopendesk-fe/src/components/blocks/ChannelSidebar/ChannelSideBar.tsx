import React from 'react';
import {useBreakpoint} from "../../../shared/hooks";
import ChannelSidebarTablet from "./ChannelSidebarTablet";
import ChannelSidebarDesktop from "./ChannelSidebarDesktop";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";
import {useNavigate} from "react-router-dom";

interface ChannelSidebarProps {
    channels: ChannelDto[];
    isTabletOpen: boolean;
    onOpenChannelSidebar: () => void;
    onCloseTablet: () => void;
}

function loadChannels(channels: ChannelDto[]) {
    const navigate = useNavigate();

    return (
        <ul>
            {
                channels
                ? (channels.map(channel => (
                    <span>
                        <li key={channel.channelId} onClick={() => navigate(`/discussion/cid/${channel.channelId}`)}>
                            <i className="bi bi-tag"></i> {channel.name.split(" | ")?.[1]}
                        </li>
                    </span>)))
                : (<p>No channels available</p>)
            }
        </ul>
    );
}

const ChannelSideBar: React.FC<ChannelSidebarProps> = ({ channels, isTabletOpen, onCloseTablet }) => {
    const bp = useBreakpoint();

    if (bp === "xs" || bp === "sm") {
        return <ChannelSidebarTablet channels={loadChannels(channels)} isOpen={isTabletOpen} onClose={onCloseTablet} />;
    }

    return <ChannelSidebarDesktop channels={loadChannels(channels)}/>;
};

export default ChannelSideBar;