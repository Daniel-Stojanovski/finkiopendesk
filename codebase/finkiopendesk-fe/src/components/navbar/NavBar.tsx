import React from "react";

import {useBreakpoint} from "../../shared/hooks";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

interface NavBarProps {
    onOpenMobileSidebar: () => void;
    onToggleNotifications: () => void;
    isNotificationsOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onOpenMobileSidebar, onToggleNotifications, isNotificationsOpen, searchQuery, setSearchQuery }) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <NavbarMobile onOpenSidebar={onOpenMobileSidebar} onToggleNotifications={onToggleNotifications} isNotificationsOpen={isNotificationsOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
    }

    return <NavbarDesktop onToggleNotifications={onToggleNotifications} isNotificationsOpen={isNotificationsOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>;
};

export default NavBar;