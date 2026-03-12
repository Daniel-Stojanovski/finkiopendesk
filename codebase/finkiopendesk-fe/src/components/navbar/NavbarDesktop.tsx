import './navbar.scss'
import SearchBar from "../search/SearchBar";
import {Link} from "react-router-dom";

const NavbarDesktop = () => {
    return (
        <>
            <div id="navbar">
                <div className="nb-desktop">
                    <SearchBar/>
                    <div className="nb-desktop-buttons">
                        <Link to={'/discussions'}>
                            <button className="nb-link-button">Forum</button>
                        </Link>
                        <Link to={'/careers'}>
                            <button className="nb-link-button">Guide</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavbarDesktop;