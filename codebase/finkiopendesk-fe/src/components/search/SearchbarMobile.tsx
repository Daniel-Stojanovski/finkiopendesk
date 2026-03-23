import { useState } from "react";
import './searchbar.scss';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchbarMobile: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="searchbar">
            {!isOpen ? (
                <button
                    className="search-mobile-button"
                    onClick={() => setIsOpen(true)}
                >
                    <i className="bi bi-search"></i>
                </button>
            ) : (
                <div className="search-mobile">
                    <input
                        className="search-mobile-search-input"
                        placeholder="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                    />
                    <span
                        className="search-mobile-search-close"
                        onClick={() => setIsOpen(false)}
                    >
                        <i className="bi bi-x"></i>
                    </span>
                </div>
            )}
        </div>
    );
};

export default SearchbarMobile;