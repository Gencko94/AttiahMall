import React from 'react';
import { Helmet } from 'react-helmet';
import CategoryLeftSide from '../components/Category/CategoryLeftSide';
import CategoryRightSide from '../components/Category/CategoryRightSide';
// import SortInfoPanel from '../components/Category/SortInfoPanel';
// import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
// import { SearchProvider } from '../contexts/SearchContext';
import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getCategoryProducts, getSingleCategoryInfo } from '../Queries/Queries';
import CategoryHeader from '../components/Category/CategoryHeader';
export default function Category() {
  const { category } = useParams();

  /**
   * Main Fetch
   */

  const { data: products, isLoading: productsLoading } = useQuery(
    ['categoryProducts', category],
    getCategoryProducts,
    { retry: true }
  );
  const { data: categoryInfo, isLoading: categoryInfoLoading } = useQuery(
    ['categoryInfo', category],
    getSingleCategoryInfo,
    { retry: true }
  );

  return (
    <Layout>
      <Helmet>
        <title>Search</title>
      </Helmet>
      <div className="max-w-default mx-auto p-4 overflow-hidden">
        <CategoryHeader
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
        />
        {/* <Breadcrumbs data={categories} /> */}
        <div className="search-page__container">
          <CategoryLeftSide
            categoryInfo={categoryInfo}
            categoryInfoLoading={categoryInfoLoading}
            products={products}
            productsLoading={productsLoading}
          />
          {/* {!isLoading && (
            <div className="relative">
              <SortInfoPanel
                queryData={queryData}
                loading={isLoading}
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
          )} */}

          <CategoryRightSide
            products={products}
            productsLoading={productsLoading}
            categoryInfo={categoryInfo}
            categoryInfoLoading={categoryInfoLoading}
            // queryData={queryData}
            // filtersApplied={filtersApplied}
            // filteredData={filteredData}
          />
        </div>
      </div>
    </Layout>
  );
}
