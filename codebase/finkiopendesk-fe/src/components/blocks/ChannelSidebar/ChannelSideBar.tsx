import React from 'react';
import {useBreakpoint} from "../../../shared/hooks";
import ChannelSidebarTablet from "./ChannelSidebarTablet";
import ChannelSidebarDesktop from "./ChannelSidebarDesktop";

interface ChannelSidebarProps {
    channels: React.ReactNode;
    isTabletOpen: boolean;
    onOpenChannelSidebar: () => void;
    onCloseTablet: () => void;

}

function loadChannels(channels: []) {
    return (
        <ul>
            {
                channels
                ? (channels.map(channel => (<li key={channel.channelId}> {channel.name} </li>)))
                : (<p>- None -</p>)
            }
        </ul>
    );
}

const ChannelSideBar: React.FC<ChannelSidebarProps> = ({ channels, isTabletOpen, onOpenChannelSidebar, onCloseTablet }) => {
    const bp = useBreakpoint();

    if (bp === "xs" || bp === "sm") {
        return (
            <div id="master-channel-sidebar">
                {!isTabletOpen && (
                    <div className="csb-toggle-button" onClick={onOpenChannelSidebar}>
                        <div className="title-header-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-diagram-3" viewBox="0 0 16 16" style={{ transform: 'rotate(-90deg)' }}>
                                <path fill-rule="evenodd"
                                      d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5zM0 11.5A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                            <h3 className="csb-toggle-button-title">Channels</h3>
                        </div>
                    </div>
                )}

                <ChannelSidebarTablet channels={loadChannels(channels)} isOpen={isTabletOpen} onClose={onCloseTablet} />
            </div>
        );
    }

    return <ChannelSidebarDesktop channels={loadChannels(channels)}/>;
};

export default ChannelSideBar;