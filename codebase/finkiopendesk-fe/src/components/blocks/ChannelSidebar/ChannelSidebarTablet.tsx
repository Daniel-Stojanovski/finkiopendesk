import './channelSidebar.scss';
import React from "react";

interface ChannelSidebarTabletProps {
    channels: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const ChannelSidebarTablet: React.FC<ChannelSidebarTabletProps> = ({ channels, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div id="channel-sidebar">
            <div className="csb-tablet">
                <div className="csb-header">
                    <div className="csb-header-title">
                        <i className="bi bi-diagram-3"></i>
                        <h3>Channels</h3>
                    </div>
                    <i className="bi bi-x csb-header-icon" onClick={onClose}></i>
                </div>

                {channels}

            </div>
        </div>
    );

}

export default ChannelSidebarTablet;