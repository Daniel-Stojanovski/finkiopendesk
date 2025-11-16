import './searchbar.scss';

const SearchbarMobile = () => {
    return (
        <div id="searchbar">
            <div className="search-mobile">
                <input className="search-mobile-search-input" placeholder="search" />
                <span className="search-mobile-search-close">x</span>
            </div>
        </div>
    );
};

export default SearchbarMobile;