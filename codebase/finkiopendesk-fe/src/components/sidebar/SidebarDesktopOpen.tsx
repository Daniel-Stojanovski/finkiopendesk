import './sidebar.scss'
import UserInfo from "../blocks/elements/UserInfo/UserInfo";

const SidebarDesktopOpen: React.FC = () => {
    return (
        <div id="sidebar">
            <div className="sb-desktop">
                <h1>Logo</h1>
                <h3>Desktop</h3>
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

export default SidebarDesktopOpen;