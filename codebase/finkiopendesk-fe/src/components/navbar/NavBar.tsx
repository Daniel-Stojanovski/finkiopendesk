import React from "react";
import {useBreakpoint} from "../../shared/hooks";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

const NavBar = () => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <NavbarMobile/>;
    }

    return <NavbarDesktop/>
}

export default NavBar;