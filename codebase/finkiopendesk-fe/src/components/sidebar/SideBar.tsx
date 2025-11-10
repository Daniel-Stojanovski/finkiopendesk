import React from 'react';
// import {useIsMobile} from "../../shared/hooks";
import {useBreakpoint} from "../../shared/hooks";
import SidebarDesktopOpen from './SidebarDesktopOpen';
import SidebarDesktopCollapsed from './SidebarDesktopCollapsed';
import SidebarMobile from './SidebarMobile';

interface SidebarProps {
    isMobileOpen: boolean;
    onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <SidebarMobile isOpen={isMobileOpen} onClose={onCloseMobile} />;
    }

    if (bp === "sm" || bp === "md") {
        return <SidebarDesktopCollapsed />;
    }

    return <SidebarDesktopOpen />;
};

export default Sidebar;