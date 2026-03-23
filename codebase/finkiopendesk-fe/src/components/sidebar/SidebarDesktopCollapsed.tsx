import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";

const SidebarDesktopCollapsed: React.FC = () => {
    return (
        <div id="sidebar">
            <div className="sb-desktop-collapsed">
                <img src="src/logo/logo-compact-finkiopendesk-500x500.png" width="100" height="100"/>
                <ul>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>

            <UserInfo/>
        </div>
    );
}

export default SidebarDesktopCollapsed;