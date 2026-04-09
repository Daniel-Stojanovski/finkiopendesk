import {useBreakpoint} from "../../shared/hooks";
import SidebarDesktopOpen from './SidebarDesktopOpen';
import SidebarDesktopCollapsed from './SidebarDesktopCollapsed';
import SidebarMobile from './SidebarMobile';
import {useUserData} from "../../shared/UserDataContext";

interface SidebarProps {
    isMobileOpen: boolean;
    onCloseMobile: () => void;
    isFiltersVisible: boolean;
    filters: any;
    setFilters: (filters: any) => void;

}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile, isFiltersVisible, filters, setFilters}) => {
    const bp = useBreakpoint();
    const { favorites } = useUserData();

    if (bp === "xs") {
        return <SidebarMobile userFavorites={favorites} isOpen={isMobileOpen} onClose={onCloseMobile}
                              isFiltersVisible={isFiltersVisible} filters={filters} setFilters={setFilters}/>;
    }

    if (bp === "sm" || bp === "md") {
        return <SidebarDesktopCollapsed userFavorites={favorites}
                                        isFiltersVisible={isFiltersVisible} filters={filters} setFilters={setFilters}/>;
    }

    return <SidebarDesktopOpen userFavorites={favorites}
                               isFiltersVisible={isFiltersVisible} filters={filters} setFilters={setFilters}/>;
};

export default Sidebar;