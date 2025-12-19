import { createContext, useState } from "react";

type SearchContextValue = {
    searchTerm: string,
    setSearchTerm: (value: string) => void;
}
export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');


    const value = {
        searchTerm,
        setSearchTerm
    }
    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>

}