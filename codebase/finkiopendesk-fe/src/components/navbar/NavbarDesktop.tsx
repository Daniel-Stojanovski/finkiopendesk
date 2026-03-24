import './navbar.scss'
import SearchBar from "../search/SearchBar";
import {NavLink} from "react-router-dom";

interface NavbarDesktopProps {
    onToggleNotifications: () => void;
    isNotificationsOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    unreadNotifications: boolean;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({onToggleNotifications, isNotificationsOpen, searchQuery, setSearchQuery, unreadNotifications}) => {
    return (
        <>
            <div id="navbar">
                <div className="nb-desktop">
                    <SearchBar searchQuery={searchQuery}
                               setSearchQuery={setSearchQuery}/>

                    <div className="nb-desktop-buttons">
                        <NavLink to="/discussions" className={({ isActive }) => `nb-link-button ${isActive ? 'active' : ''}`}>
                            Forum
                        </NavLink>
                        <NavLink to="/careers" className={({ isActive }) => `nb-link-button ${isActive ? 'active' : ''}`}>
                            Guide
                        </NavLink>
                    </div>

                    <button className={`nb-notifications-button ${unreadNotifications ? 'notification-identifier' : ''} ${isNotificationsOpen ? 'active': ''}`} onClick={onToggleNotifications}>
                        <i className="bi bi-bell"></i>
                    </button>
                </div>
            </div>
        </>
    );
}

export default NavbarDesktop;