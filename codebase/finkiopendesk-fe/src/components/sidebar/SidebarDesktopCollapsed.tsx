import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";
import type {UserFavoriteDto} from "../../shared/dto/UserFavoriteDto";
import UserFavorites from "../blocks/elements/UserFavorites/UserFavorites";
import FilterBox from "../blocks/elements/FilterBox/FilterBox";

interface SidebarDesktopCollapsedProps {
    userFavorites: UserFavoriteDto[];
    isFiltersVisible: boolean;
    filters: any;
    setFilters: (filters: any) => void;
}

const SidebarDesktopCollapsed: React.FC<SidebarDesktopCollapsedProps> = ({userFavorites, isFiltersVisible, filters, setFilters }) => {
    return (
        <div id="sidebar">
            <div className="sb-desktop-collapsed">
                <div className="sb-desktop-collapsed-header">
                    <img src="src/logo/logo-compact-finkiopendesk-500x500.png" width="100" height="100"/>
                </div>
                <UserFavorites userFavorites={userFavorites} sidebarCollapsed/>
                <FilterBox
                    isVisible={isFiltersVisible}
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>
            <UserInfo/>
        </div>
    );
}

export default SidebarDesktopCollapsed;