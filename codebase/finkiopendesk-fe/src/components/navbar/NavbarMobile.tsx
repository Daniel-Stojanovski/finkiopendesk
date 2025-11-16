import './navbar.scss';
import SearchBar from "../search/SearchBar";

interface NavbarMobileProps {
    onOpenSidebar?: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ onOpenSidebar }) => {
    return (
        <div id="navbar">
            <div className="nb-mobile">
                <div className="nb-mobile-bar">
                    <button onClick={onOpenSidebar}>
                        <img src="/vite.svg" alt="finkiopendesk_logo" width="36" height="36"/>
                    </button>
                    <SearchBar/>
                </div>
                <div className="nb-mobile-buttons">
                    <button className="nb-link-button">Forum</button>
                    <button className="nb-link-button">Guide</button>
                </div>
            </div>
        </div>
    );
};

export default NavbarMobile;