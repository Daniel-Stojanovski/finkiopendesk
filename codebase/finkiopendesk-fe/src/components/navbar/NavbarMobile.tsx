import './navbar.scss'

const NavbarMobile = () => {
    return (
        <>
            <div id="navbar">
                <div className="nb-mobile">
                    <div className="nb-mobile-bar">
                        <img className="nb-mobile-logo" src="../../public/vite.svg" width="36" height="36" alt="finkiopendesk_logo"/>
                        <input className="nb-mobile-searchbar" placeholder='search'></input>
                        <span>x</span>
                    </div>
                    <div className="nb-mobile-buttons">
                        <button className="nb-link-button">Forum</button>
                        <button className="nb-link-button">Guide</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NavbarMobile;