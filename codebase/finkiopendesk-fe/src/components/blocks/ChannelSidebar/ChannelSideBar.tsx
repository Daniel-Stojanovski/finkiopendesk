import React from 'react';
import {useBreakpoint} from "../../../shared/hooks";
import ChannelSidebarTablet from "./ChannelSidebarTablet";
import ChannelSidebarDesktop from "./ChannelSidebarDesktop";
import type {ChannelDto} from "../../../shared/dto/ChannelDto";

interface ChannelSidebarProps {
    channels: ChannelDto[];
    isTabletOpen: boolean;
    onOpenChannelSidebar: () => void;
    onCloseTablet: () => void;
}

function loadChannels(channels: ChannelDto[]) {
    return (
        <ul>
            {
                channels
                ? (channels.map(channel => (<li key={channel.channelId}> {channel.name.split(" | ")?.[1]} </li>)))
                : (<p>- None -</p>)
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