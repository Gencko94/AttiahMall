import React from 'react';
import CategoryItemLoader from './CategoryItemLoader';
import CategoryProductItem from './CategoryProductItem';

export default function CategoryRightSide({
  products,
  queryData,
  filteredData,
  filtersApplied,
  productsLoading,
  categoryInfo,
  categoryInfoLoading,
}) {
  if (productsLoading || categoryInfoLoading) {
    return (
      <div className="search-page-items__grid py-2  min-h-screen">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
          return <CategoryItemLoader key={i} />;
        })}
      </div>
    );
  }
  return (
    <div className="py-2">
      {products.length !== 0 && (
        <div className="search-page-items__grid py-2 ">
          {products.map(item => {
            return <CategoryProductItem key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
}
