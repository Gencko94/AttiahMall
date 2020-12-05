import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryLeftSide from '../components/Category/CategoryLeftSide';
import CategoryRightSide from '../components/Category/CategoryRightSide';
import SortInfoPanel from '../components/Category/SortInfoPanel';
import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import { SearchProvider } from '../contexts/SearchContext';
import { MdClose } from 'react-icons/md';
import Layout from '../components/Layout';
export default function Category({
  match: {
    params: { query },
  },
}) {
  const { getSearchResults } = React.useContext(SearchProvider);
  const [loading, setLoading] = React.useState(true);
  const [queryData, setQueryData] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [brandFilters, setBrandFilters] = React.useState([]);
  const [subCategoryFilter, setSubCategoryFilter] = React.useState(null);
  const [categories, setCategories] = React.useState(null);
  const [brands, setBrands] = React.useState([]);
  const [numberOfItems, setNumberOfItems] = React.useState(null);
  const [lowestPrice, setLowestPrice] = React.useState(0);
  const [highestPrice, setHighestPrice] = React.useState(0);
  const [filtersApplied, setFiltersApplied] = React.useState(false);
  const [filters, setFilters] = React.useState({
    subCategory: null,
    brand: null,
  });
  const [sortBy, setSortBy] = React.useState('Popularity');
  const filterQueryData = (data, filter) => {
    console.log(filter, 'filter function');
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
  const handleSettingBrands = () => {
    if (filtersApplied) return;
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

  const handleSortByChange = sortBy => {
    if (sortBy === 'Popularity') return;
    if (filtersApplied) {
      if (sortBy === 'Price (Low to High)') {
        setFilteredData(
          filteredData.sort((a, b) => parseInt(a.price) > parseInt(b.price))
        );
      } else if (sortBy === 'Price (High to Low)') {
        setFilteredData(
          filteredData.sort((a, b) => parseInt(a.price) < parseInt(b.price))
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
      } else {
        setQueryData(getSearchResults({ query }));
      }
    }
  };
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
      brands.push(name);
      setBrandFilters(brands);
    }
  };
  const handleCategoryChange = name => {
    setSubCategoryFilter(name);
  };
  React.useEffect(() => {
    if (loading) return;
    if (filtersApplied) {
      setFilteredData(filterQueryData(queryData, filters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  React.useEffect(() => {
    setFiltersApplied(false);
    setQueryData(getSearchResults({ query }));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  React.useEffect(() => {
    handleSettingCategories();
    handleSettingBrands();
    calculateMinMax();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryData]);
  function sortByBrand(brand) {
    return brandFilters.includes(brand);
  }
  function sortBysubCategory(subCategory) {
    return subCategory === subCategoryFilter;
  }
  React.useEffect(() => {
    if (!queryData) {
      return;
    }
    if (brandFilters.length === 0 && !subCategoryFilter) {
      setFilters({
        subCategory: null,
        brand: null,
      });
      setFiltersApplied(false);
    } else if (brandFilters.length === 0 && subCategoryFilter) {
      setFiltersApplied(true);
      setFilters({ subCategory: sortBysubCategory, brand: null });
    } else if (brandFilters.length > 0 && !subCategoryFilter) {
      setFiltersApplied(true);
      setFilters({
        subCategory: null,
        brand: sortByBrand,
      });
    } else {
      setFilters({
        subCategory: sortBysubCategory,
        brand: sortByBrand,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandFilters, subCategoryFilter]);
  return (
    <Layout>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="max-w-default mx-auto px-4">
        <Breadcrumbs />
        <div className="search-page__container">
          <CategoryLeftSide
            categories={categories}
            loading={loading}
            numberOfItems={numberOfItems}
            lowestPrice={lowestPrice}
            setLowestPrice={setLowestPrice}
            highestPrice={highestPrice}
            setHighestPrice={setHighestPrice}
            handlePriceChange={handlePriceChange}
            handleCategoryChange={handleCategoryChange}
            handleBrandChange={handleBrandChange}
            brands={brands}
            brandFilters={brandFilters}
          />
          {!loading && (
            <div className="relative">
              <SortInfoPanel
                queryData={queryData}
                loading={loading}
                query={query}
                sortBy={sortBy}
                setSortBy={setSortBy}
                handleSortByChange={handleSortByChange}
              />
              {filtersApplied && (
                <div className="py-2 flex items-center">
                  <h1 className="text-sm font-semibold mr-3">Filtered By</h1>
                  <div className="flex items-center">
                    {brandFilters.length !== 0 &&
                      brandFilters.map(brand => (
                        <button
                          key={brand}
                          className="px-2 py-1 mr-3 flex border rounded items-center"
                        >
                          <h1 className="text-xs text-gray-500 mr-2">
                            Brand :{' '}
                          </h1>
                          <span className="text-xs font-bold mr-2">
                            {brand}
                          </span>
                          <MdClose
                            onClick={() => handleBrandChange(brand)}
                            className="hover:text-red-700"
                          />
                        </button>
                      ))}
                  </div>
                </div>
              )}
              <div className="search-page-items__grid py-2 ">
                <CategoryRightSide
                  queryData={queryData}
                  filtersApplied={filtersApplied}
                  filteredData={filteredData}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
