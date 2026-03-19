import './navbar.scss'
import SearchBar from "../search/SearchBar";
import {Link} from "react-router-dom";

interface NavbarDesktopProps {
    onToggleNotifications: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({onToggleNotifications, searchQuery, setSearchQuery}) => {
    return (
        <>
            <div id="navbar">
                <div className="nb-desktop">
                    <SearchBar searchQuery={searchQuery}
                               setSearchQuery={setSearchQuery}/>

                    <div className="nb-desktop-buttons">
                        <Link to={'/discussions'}>
                            <button className="nb-link-button">Forum</button>
                        </Link>
                        <Link to={'/careers'}>
                            <button className="nb-link-button">Guide</button>
                        </Link>
                    </div>

                    <button className="nb-notifications-button" onClick={onToggleNotifications}>🔔</button>
                </div>
            </div>
        </>
    );
}

export default NavbarDesktop;