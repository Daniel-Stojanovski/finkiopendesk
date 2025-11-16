import './navbar.scss'
import SearchBar from "../search/SearchBar";

const NavbarDesktop = () => {
    return (
        <>
            <div id="navbar">
                <div className="nb-desktop">
                    <SearchBar/>
                    <div className="nb-desktop-buttons">
                        <button className="nb-link-button">Forum</button>
                        <button className="nb-link-button">Guide</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavbarDesktop;