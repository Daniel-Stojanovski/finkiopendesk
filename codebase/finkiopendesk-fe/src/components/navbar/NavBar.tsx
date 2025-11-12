import React from "react";

import {useBreakpoint} from "../../shared/hooks";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

interface NavBarProps {
    onOpenMobileSidebar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onOpenMobileSidebar }) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <NavbarMobile onOpenSidebar={onOpenMobileSidebar} />;
    }

    return <NavbarDesktop />;
};

export default NavBar;