import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";

const SidebarDesktopCollapsed: React.FC = () => {
    return (
        <div id="sidebar">
            <div className="sb-desktop-collapsed">
                <h1>Logo</h1>
                <hr></hr>
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