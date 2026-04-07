import './navbar.scss';
import SearchBar from "../search/SearchBar";
import {NavLink} from "react-router-dom";

interface NavbarMobileProps {
    isVisible: boolean;
    onOpenSidebar?: () => void;
    onToggleNotifications: () => void;
    isNotificationsOpen: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    unreadNotifications: boolean;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ isVisible, onOpenSidebar, onToggleNotifications, isNotificationsOpen, searchQuery, setSearchQuery, unreadNotifications }) => {
    if (!isVisible) return null;

    return (
        <div id="navbar">
            <div className="nb-mobile">
                <div className="nb-mobile-bar">
                    <button className='nb-sidebar-button' onClick={onOpenSidebar}>
                        <i className="bi bi-list"></i>
                    </button>
                    <SearchBar searchQuery={searchQuery}
                               setSearchQuery={setSearchQuery}/>

                    <button className={`nb-notifications-button ${unreadNotifications ? 'notification-identifier' : ''} ${isNotificationsOpen ? 'active': ''}`} onClick={onToggleNotifications}>
                        <i className="bi bi-bell"></i>
                    </button>
                </div>

                <div className="nb-mobile-buttons">
                    <NavLink to="/discussions" className={({ isActive }) => `nb-link-button ${isActive ? 'active' : ''}`}>
                        Forum
                    </NavLink>
                    <NavLink to="/careers" className={({ isActive }) => `nb-link-button ${isActive ? 'active' : ''}`}>
                        Guide
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavbarMobile;