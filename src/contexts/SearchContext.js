import React, { createContext } from 'react';
import { DataProvider } from './DataContext';
export const SearchProvider = createContext();
export default function SearchContext({ children }) {
  const { allItems } = React.useContext(DataProvider);
  const getSearchResults = ({ query }) => {
    const items = allItems.filter(item => {
      return item.name.toLowerCase().indexOf(query) !== -1;
    });
    return items;
  };

  return (
    <SearchProvider.Provider value={{ getSearchResults }}>
      {children}
    </SearchProvider.Provider>
  );
}
