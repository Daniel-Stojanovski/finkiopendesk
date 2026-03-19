import React from "react";

import {useBreakpoint} from "../../shared/hooks";
import SearchbarDesktop from "./SearchbarDesktop";
import SearchbarMobile from "./SearchbarMobile";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({searchQuery, setSearchQuery}) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <SearchbarMobile
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />;
    }

    return <SearchbarDesktop
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
    />;
};

export default SearchBar;