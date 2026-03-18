import React from "react";

import {useBreakpoint} from "../../shared/hooks";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

interface NavBarProps {
    onOpenMobileSidebar: () => void;
    onToggleNotifications: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onOpenMobileSidebar, onToggleNotifications }) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <NavbarMobile onOpenSidebar={onOpenMobileSidebar} onToggleNotifications={onToggleNotifications}/>;
    }

    return <NavbarDesktop onToggleNotifications={onToggleNotifications}/>;
};

export default NavBar;