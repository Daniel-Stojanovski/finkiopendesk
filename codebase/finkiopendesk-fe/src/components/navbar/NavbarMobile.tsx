import './navbar.scss';
import SearchBar from "../search/SearchBar";
import {Link} from "react-router-dom";

interface NavbarMobileProps {
    onOpenSidebar?: () => void;
    onToggleNotifications: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ onOpenSidebar, onToggleNotifications }) => {
    return (
        <div id="navbar">
            <div className="nb-mobile">
                <div className="nb-mobile-bar">
                    <button onClick={onOpenSidebar}>
                        <img src="/vite.svg" alt="finkiopendesk_logo" width="36" height="36"/>
                    </button>
                    <SearchBar/>

                    <button className="nb-notifications-button" onClick={onToggleNotifications}>🔔</button>
                </div>

                <div className="nb-mobile-buttons">
                    <Link to={'/discussions'} className="nb-link">
                        <button className="nb-link-button">Forum</button>
                    </Link>
                    <Link to={'/careers'} className="nb-link">
                        <button className="nb-link-button">Guide</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavbarMobile;