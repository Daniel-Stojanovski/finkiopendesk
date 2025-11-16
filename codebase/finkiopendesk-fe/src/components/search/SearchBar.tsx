import React from "react";

import {useBreakpoint} from "../../shared/hooks";
import SearchbarDesktop from "./SearchbarDesktop";
import SearchbarMobile from "./SearchbarMobile";

interface SearchBarProps {
}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
    const bp = useBreakpoint();

    if (bp === "xs") {
        return <SearchbarMobile />;
    }

    return <SearchbarDesktop />;
};

export default SearchBar;