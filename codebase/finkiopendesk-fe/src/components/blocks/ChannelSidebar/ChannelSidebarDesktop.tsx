import React from "react";
import './channelSidebar.scss';

interface ChannelSidebarDesktopProps {
    channels: React.ReactNode;
}

const ChannelSidebarDesktop: React.FC<ChannelSidebarDesktopProps> = ({ channels }) => {
    return (
        <div id="channel-sidebar">
            <div className="csb-desktop">
                <div className="csb-header">
                    <div className="csb-header-title">
                        <i className="bi bi-diagram-3"></i>
                        <h3>Channels</h3>
                    </div>
                </div>

                {channels}

            </div>
        </div>
    );

}

export default ChannelSidebarDesktop;