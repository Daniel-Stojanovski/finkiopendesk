import {useBreakpoint} from "../../shared/hooks";
import SidebarDesktopOpen from './SidebarDesktopOpen';
import SidebarDesktopCollapsed from './SidebarDesktopCollapsed';
import SidebarMobile from './SidebarMobile';
import {useUserData} from "../../shared/UserDataContext";
import type {FiltersDto} from "../../shared/dto/FiltersDto";

interface SidebarProps {
    isMobileOpen: boolean;
    onCloseMobile: () => void;
    isFiltersVisible: boolean;
    filters: FiltersDto;
    setFilters: React.Dispatch<React.SetStateAction<FiltersDto>>;
    toggleFilters: () => void;
    isFilterOpen: boolean;
    filterTag: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile, isFiltersVisible, toggleFilters, isFilterOpen, filterTag}) => {
    const bp = useBreakpoint();
    const { favorites } = useUserData();

    if (bp === "xs") {
        return <SidebarMobile userFavorites={favorites} isOpen={isMobileOpen} onClose={onCloseMobile}
                              isFiltersVisible={isFiltersVisible} toggleFilters={toggleFilters}
                              isFilterOpen={isFilterOpen} filterTag={filterTag}/>;
    }

    if (bp === "sm" || bp === "md") {
        return <SidebarDesktopCollapsed userFavorites={favorites}
                                        isFiltersVisible={isFiltersVisible} toggleFilters={toggleFilters}
                                        isFilterOpen={isFilterOpen} filterTag={filterTag}/>;
    }

    return <SidebarDesktopOpen userFavorites={favorites}
                               isFiltersVisible={isFiltersVisible} toggleFilters={toggleFilters}
                               isFilterOpen={isFilterOpen} filterTag={filterTag}/>;
};

export default Sidebar;