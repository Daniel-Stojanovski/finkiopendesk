import { useState } from "react";
import './searchbar.scss';

const SearchbarMobile = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="searchbar">
            {!isOpen ? (
                <button
                    className="search-mobile-button"
                    onClick={() => setIsOpen(true)}
                >
                    Search
                </button>
            ) : (
                <div className="search-mobile">
                    <input
                        className="search-mobile-search-input"
                        placeholder="search"
                        autoFocus
                    />
                    <span
                        className="search-mobile-search-close"
                        onClick={() => setIsOpen(false)}
                    >
                        x
                    </span>
                </div>
            )}
        </div>
    );
};

export default SearchbarMobile;