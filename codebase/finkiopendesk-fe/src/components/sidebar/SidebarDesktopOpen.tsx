import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";
import type {UserFavoriteDto} from "../../shared/dto/UserFavoriteDto";
import UserFavorites from "../blocks/elements/UserFavorites/UserFavorites";
import FilterTab from "../blocks/elements/Filter/FilterTab";

interface SidebarDesktopOpenProps {
    userFavorites: UserFavoriteDto[];
    isFiltersVisible: boolean;
    toggleFilters: () => void;
    isFilterOpen: boolean;
    filterTag: string;
}

const SidebarDesktopOpen: React.FC<SidebarDesktopOpenProps> = ({userFavorites, isFiltersVisible, toggleFilters, isFilterOpen, filterTag}) => {
    return (
        <div id="sidebar">
            <div className="sb-desktop">
                <div className="sb-desktop-header">
                    <img src="src/logo/logo-compact-finkiopendesk-500x500.png" alt="finkiopendesk_compact_icon" width={100} height={100}/>
                </div>
                <UserFavorites userFavorites={userFavorites} />
                {isFiltersVisible &&
                    <FilterTab onToggle={toggleFilters} isOpen={isFilterOpen} filterTag={filterTag}/>
                }
            </div>

            <UserInfo/>
        </div>
    );
}

export default SidebarDesktopOpen;