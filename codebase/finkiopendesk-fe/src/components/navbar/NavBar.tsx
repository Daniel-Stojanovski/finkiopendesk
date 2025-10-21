import './navbar.scss'

const NavBar = () => {
    return (
        <>
            <div id="navbar-desktop">
                <p>navbar</p>
                <input className="navbar-searchbar" placeholder='search'></input>
                <div className="navbar-buttons">
                    <button className="navbar-link-button">forum</button>
                    <button className="navbar-link-button">guide</button>
                </div>
            </div>
        </>
    );
}

export default NavBar;