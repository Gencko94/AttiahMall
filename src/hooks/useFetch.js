import { useCallback, useEffect, useState } from 'react';

export const useFetch = (url, query) => {
  const [filteredItems, setFilteredItems] = useState(null);
  const filterItems = useCallback(() => {
    setFilteredItems(
      url.filter(item => item.name.toLowerCase().indexOf(query) !== -1)
    );
  }, [query, url]);
  useEffect(() => {
    filterItems();
  }, [filterItems, query, url]);

  return [filteredItems];
};
