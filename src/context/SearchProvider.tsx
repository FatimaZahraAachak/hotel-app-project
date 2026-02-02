import { useState } from "react";

import { SearchContext } from "./SearchContext";

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    

    return <SearchContext.Provider value={{
        searchTerm,
        setSearchTerm,
        country,
        setCountry
    }}>{children}</SearchContext.Provider>


}