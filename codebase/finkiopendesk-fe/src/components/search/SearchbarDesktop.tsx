import './searchbar.scss';

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchbarDesktop: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div id="searchbar">
            <div className="search-desktop">
                <input
                    className="search-desktop-search-input"
                    placeholder="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchbarDesktop;