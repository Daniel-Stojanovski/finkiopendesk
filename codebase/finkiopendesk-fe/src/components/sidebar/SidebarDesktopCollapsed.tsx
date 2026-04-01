import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";
import type {UserFavoriteDto} from "../../shared/dto/UserFavoriteDto";
import UserFavorites from "../blocks/elements/UserFavorites/UserFavorites";

interface SidebarDesktopCollapsedProps {
    userFavorites: UserFavoriteDto[];
}

const SidebarDesktopCollapsed: React.FC<SidebarDesktopCollapsedProps> = ({userFavorites}) => {
    return (
        <div id="sidebar">
            <div className="sb-desktop-collapsed">
                <img src="src/logo/logo-compact-finkiopendesk-500x500.png" width="100" height="100"/>
                <UserFavorites userFavorites={userFavorites} sidebarCollapsed/>
            </div>

            <UserInfo/>
        </div>
    );
}

export default SidebarDesktopCollapsed;