import {useBreakpoint} from "../../shared/hooks";
import SidebarDesktopOpen from './SidebarDesktopOpen';
import SidebarDesktopCollapsed from './SidebarDesktopCollapsed';
import SidebarMobile from './SidebarMobile';
import {useUserData} from "../../shared/UserDataContext";

interface SidebarProps {
    isMobileOpen: boolean;
    onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
    const bp = useBreakpoint();
    const { favorites } = useUserData();

    if (bp === "xs") {
        return <SidebarMobile userFavorites={favorites} isOpen={isMobileOpen} onClose={onCloseMobile} />;
    }

    if (bp === "sm" || bp === "md") {
        return <SidebarDesktopCollapsed userFavorites={favorites} />;
    }

    return <SidebarDesktopOpen userFavorites={favorites}/>;
};

export default Sidebar;