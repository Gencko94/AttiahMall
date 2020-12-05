import React from 'react';
import { useIntl } from 'react-intl';
// import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
// import { getCategories } from '../../Queries/Queries';

export default function CategoryLeftSide({
  loading,
  category,
  productsLoading,

  setLowestPrice,

  setHighestPrice,
  handlePriceChange,
  handleCategoryChange,
  products,

  handleBrandChange,
  categoryInfo,
  categoryInfoLoading,
}) {
  // const { data: categories, isLoading: categoriesLoading } = useQuery(
  //   ['categoryTree', category],
  //   async (key, category) => {
  //     const res = await getCategories(category);
  //     console.log(res);
  //     return res;
  //   }
  // );
  // const { data: brands, isLoading: brandsLoading } = useQuery(
  //   ['brands', category],
  //   async (key, category) => {
  //     const res = await getCategories(category);
  //     console.log(res);
  //     return res;
  //   }
  // );
  const { locale } = useIntl();

  return (
    <div className="py-2">
      {categoryInfoLoading && <div>loading</div>}
      {!categoryInfoLoading && (
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Category</h1>
          <hr className="my-2" />

          <div className="my-2" key={categoryInfo.id}>
            <div className="flex justify-between">
              <h1 className="font-semibold text-sm">
                {categoryInfo.translation[locale].name}
              </h1>
              {/* <div>{numberOfItems[category]}</div> */}
            </div>
            {categoryInfo.children.length !== 0 &&
              categoryInfo.children.map(subCategory => (
                <Link
                  to={`/${locale}/categories/${subCategory.slug}`}
                  key={subCategory.id}
                  // onClick={() => handleCategoryChange(subCategory)}
                  className="text-sm block hover:underline hover:text-blue-700"
                >
                  {subCategory.translation[locale].name}
                </Link>
              ))}
          </div>
        </div>
      )}
      {/* Brands */}
      {!productsLoading && (
        <div className="mb-4">
          <h1 className="text-xl font-semibold">Brand</h1>
          <hr className="my-2" />
          <div className="flex flex-col justify-center">
            {products.map(product => {
              return product.brand_id ? (
                <div
                  key={product.brand_id}
                  className="flex items-center mb-2 text-sm "
                >
                  <input
                    type="checkbox"
                    className="form-checkbox border-gray-600 text-red-700 mr-5"
                    onChange={() => handleBrandChange(product)}
                    // checked={brandFilters.includes(product)}
                  />
                  <label
                    className="hover:underline hover:text-blue-700 cursor-pointer"
                    htmlFor={product}
                  >
                    {product.brand_id}
                  </label>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Price (KW)</h1>
        <hr className="my-2" />
        <div className="flex items-center">
          <input
            type="number"
            placeholder="Min"
            className=" flex-1 border min-w-0 p-1 rounded-sm"
            value=""
            onChange={e => setLowestPrice(e.target.value)}
          />
          <span className="text-gray-600 text-xs mx-1">To</span>
          <input
            type="number"
            placeholder="Max"
            className="flex-1 border min-w-0 p-1 rounded-sm mr-1"
            value=""
            onChange={e => setHighestPrice(e.target.value)}
          />
          <button
            onClick={handlePriceChange}
            className="p-1 bg-green-400 rounded"
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}
