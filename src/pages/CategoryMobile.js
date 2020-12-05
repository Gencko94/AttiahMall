import React from 'react';
import FiltersMobile from '../components/CategoryMobile/FiltersMobile';
import SearchItemsGridMobile from '../components/CategoryMobile/SearchItemsGridMobile';
import SortByMobile from '../components/CategoryMobile/SortByMobile';
import SortInfoPanelMobile from '../components/CategoryMobile/SortInfoPanelMobile';
import { SearchProvider } from '../contexts/SearchContext';

export default function CategoryMobile({
  match: {
    params: { query },
  },
}) {
  const { getSearchResults } = React.useContext(SearchProvider);
  const [loading, setLoading] = React.useState(true);
  const [queryData, setQueryData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [categories, setCategories] = React.useState(null);
  const [brands, setBrands] = React.useState([]);
  const [numberOfItems, setNumberOfItems] = React.useState(null);
  const [lowestPrice, setLowestPrice] = React.useState(0);
  const [highestPrice, setHighestPrice] = React.useState(0);
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [categoryFilter, setCategoryFilter] = React.useState(null);
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [filters, setFilters] = React.useState({
    subCategory: null,
    brand: null,
  });
  const [sortBy, setSortBy] = React.useState('Popularity');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const [sortByOpen, setSortByOpen] = React.useState(false);
  React.useEffect(() => {
    setFiltersApplied(false);
    setQueryData(getSearchResults({ query }));
    // setData(getSearchResults({ query }));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  React.useEffect(() => {
    handleSettingCategories();
    handleSettingBrands();
    calculateMinMax();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);

  const filterQueryData = (data, filter) => {
    if (!filter) return;
    const filterKeys = Object.keys(filter);
    return data.filter(item => {
      return filterKeys.every(key => {
        if (typeof filter[key] !== 'function') {
          return true;
        } else {
          return filter[key](item[key]);
        }
      });
    });
  };
  React.useEffect(() => {
    if (loading) return;
    if (filtersApplied) {
      setFilteredData(filterQueryData(queryData, filters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleCategoryChange = name => {
    setCategoryFilter(name);
  };
  const handleSortByChange = sortBy => {
    // if (sortBy === 'Popularity') return;
    console.log(sortBy);
    if (filtersApplied) {
      if (sortBy === 'Price (Low to High)') {
        setFilteredData(
          filteredData.sort((a, b) => parseInt(a.price) < parseInt(b.price))
        );
      } else if (sortBy === 'Price (High to Low)') {
        setFilteredData(
          filteredData.sort((a, b) => parseInt(a.price) > parseInt(b.price))
        );
      }
    } else {
      if (sortBy === 'Price (Low to High)') {
        setQueryData(
          queryData.sort((a, b) => parseInt(a.price) > parseInt(b.price))
        );
      } else if (sortBy === 'Price (High to Low)') {
        setQueryData(
          queryData.sort((a, b) => parseInt(a.price) < parseInt(b.price))
        );
      }
    }
  };
  function sortByBrand(brand) {
    return brandFilters.includes(brand);
  }
  function sortBysubCategory(subCategory) {
    return subCategory === categoryFilter;
  }
  React.useEffect(() => {
    if (!queryData) {
      return;
    }
    if (brandFilters.length === 0 && !categoryFilter) {
      setFilters({
        subCategory: null,
        brand: null,
      });
      setFiltersApplied(false);
    } else if (brandFilters.length === 0 && categoryFilter) {
      setFiltersApplied(true);
      setFilters({ subCategory: sortBysubCategory, brand: null });
    } else if (brandFilters.length > 0 && !categoryFilter) {
      setFiltersApplied(true);
      setFilters({
        ...filters,
        brand: sortByBrand,
      });
    } else {
      console.log('cool');
      setFilters({
        subCategory: sortBysubCategory,
        brand: sortByBrand,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandFilters, categoryFilter]);

  const handleBrandChange = name => {
    let brands = [...brandFilters];
    if (brands.includes(name)) {
      brands = brands.filter(item => item !== name);
      if (brands.length === 0) {
        setBrandFilters([]);
      } else {
        setBrandFilters(brands);
      }
    } else {
      console.log('pushed');
      brands.push(name);
      setBrandFilters(brands);
    }
  };
  const handleSettingBrands = () => {
    let brands = [];
    queryData.forEach(item => {
      if (item.brand) {
        brands.push(item.brand);
      }
    });
    setBrands([...new Set(brands)]);
  };

  const handleSettingCategories = () => {
    let categories = {};
    let numberOfItems = {};

    queryData.forEach(queryItem => {
      if (!categories[queryItem.category]) {
        categories[queryItem.category] = [];
      }

      if (!categories[queryItem.category].includes(queryItem.subCategory)) {
        categories[queryItem.category].push(queryItem.subCategory);
      }
    });
    // number of items
    queryData.forEach(queryItem => {
      if (!numberOfItems[queryItem.category]) {
        numberOfItems[queryItem.category] = 1;
      } else {
        numberOfItems[queryItem.category] =
          numberOfItems[queryItem.category] + 1;
      }
    });
    setNumberOfItems(numberOfItems);
    setCategories(categories);
  };
  const handlePriceChange = () => {
    if (filtersApplied) {
      setFilteredData(
        queryData.filter(item => {
          return (
            parseInt(item.price) >= lowestPrice &&
            parseInt(item.price) <= highestPrice
          );
        })
      );
    } else {
      setQueryData(
        queryData.filter(item => {
          return (
            parseInt(item.price) >= lowestPrice &&
            parseInt(item.price) <= highestPrice
          );
        })
      );
    }
  };

  const calculateMinMax = () => {
    if (!filtersApplied) {
      let prices = [];

      queryData.forEach(filteredItem => {
        prices.push(parseInt(filteredItem.price));
      });

      let min = Math.min(...prices);
      let max = Math.max(...prices);
      setLowestPrice(min);
      setHighestPrice(max);
    }
  };
  return (
    <div className="min-h-screen">
      <SortInfoPanelMobile
        loading={loading}
        query={query}
        queryData={queryData}
        setFiltersOpen={setFiltersOpen}
        filtersOpen={filtersOpen}
        brandFilters={brandFilters}
        handleBrandChange={handleBrandChange}
        filtersApplied={filtersApplied}
        setSortByOpen={setSortByOpen}
      />
      <FiltersMobile
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        handleCategoryChange={handleCategoryChange}
        numberOfItems={numberOfItems}
        categories={categories}
        brands={brands}
        loading={loading}
        brandFilters={brandFilters}
        handleBrandChange={handleBrandChange}
        highestPrice={highestPrice}
        setHighestPrice={setHighestPrice}
        lowestPrice={lowestPrice}
        setLowestPrice={setLowestPrice}
        handlePriceChange={handlePriceChange}
      />
      <SortByMobile
        sortByOpen={sortByOpen}
        setSortByOpen={setSortByOpen}
        handleSortByChange={handleSortByChange}
        setSortBy={setSortBy}
        sortBy={sortBy}
      />
      <SearchItemsGridMobile
        queryData={queryData}
        loading={loading}
        filteredData={filteredData}
        filtersApplied={filtersApplied}
      />
    </div>
  );
}
