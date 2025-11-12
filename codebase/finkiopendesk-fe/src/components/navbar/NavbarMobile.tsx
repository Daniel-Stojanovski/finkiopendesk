import './navbar.scss';

interface NavbarMobileProps {
    onOpenSidebar?: () => void;
}

const NavbarMobile: React.FC<NavbarMobileProps> = ({ onOpenSidebar }) => {
    return (
        <div id="navbar">
            <div className="nb-mobile">
                <div className="nb-mobile-bar">
                    <img className="nb-mobile-logo"
                         src="/vite.svg" alt="finkiopendesk_logo"
                         width="36" height="36"
                         onClick={onOpenSidebar}
                    />
                    <input className="nb-mobile-searchbar" placeholder="search" />
                    <span>x</span>
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