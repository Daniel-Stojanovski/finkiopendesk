import './navbar.scss'

const NavbarDesktop = () => {
    return (
        <>
            <div id="navbar">
                <div className="nb-desktop">
                    <input className="nb-desktop-searchbar" placeholder='search'></input>
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