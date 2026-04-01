import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";
import type {UserFavoriteDto} from "../../shared/dto/UserFavoriteDto";
import UserFavorites from "../blocks/elements/UserFavorites/UserFavorites";

interface SidebarDesktopOpenProps {
    userFavorites: UserFavoriteDto[];
}

const SidebarDesktopOpen: React.FC<SidebarDesktopOpenProps> = ({userFavorites}) => {
    return (
        <div id="sidebar">
            <div className="sb-desktop">
                <div className="sb-desktop-header">
                    <img src="src/logo/logo-compact-finkiopendesk-500x500.png" width="100" height="100"/>
                </div>
                <UserFavorites userFavorites={userFavorites} />
            </div>

            <UserInfo/>
        </div>
    );
}

export default SidebarDesktopOpen;