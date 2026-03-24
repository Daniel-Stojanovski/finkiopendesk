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
    unreadNotifications: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ onOpenMobileSidebar, onToggleNotifications, isNotificationsOpen, searchQuery, setSearchQuery, unreadNotifications }) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <NavbarMobile onOpenSidebar={onOpenMobileSidebar} onToggleNotifications={onToggleNotifications} isNotificationsOpen={isNotificationsOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} unreadNotifications={unreadNotifications}/>;
    }

    return <NavbarDesktop onToggleNotifications={onToggleNotifications} isNotificationsOpen={isNotificationsOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} unreadNotifications={unreadNotifications}/>;
};

export default NavBar;