import React from 'react';

export default function CategoryLeftSide({
  loading,
  categories,
  numberOfItems,
  lowestPrice,
  setLowestPrice,
  highestPrice,
  setHighestPrice,
  handlePriceChange,
  handleCategoryChange,
  brands,
  brandFilters,
  handleBrandChange,
}) {
  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Category</h1>
        <hr className="my-2" />
        {!loading &&
          Object.keys(categories).map(category => {
            return (
              <div className="my-2" key={category}>
                <div className="flex justify-between">
                  <h1 className="font-semibold text-sm">{category}</h1>
                  <div>{numberOfItems[category]}</div>
                </div>
                {categories[category].map(subCategory => (
                  <button
                    key={subCategory}
                    onClick={() => handleCategoryChange(subCategory)}
                    className="text-sm block hover:underline hover:text-blue-700"
                  >
                    {subCategory}
                  </button>
                ))}
              </div>
            );
          })}
      </div>
      {/* Brands */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Brand</h1>
        <hr className="my-2" />
        <div className="flex flex-col justify-center">
          {brands.map(brand => {
            return (
              <div key={brand} className="flex items-center mb-2 text-sm ">
                <input
                  id={brand}
                  type="checkbox"
                  className="form-checkbox border-gray-600 text-red-700 mr-5"
                  onChange={() => handleBrandChange(brand)}
                  checked={brandFilters.includes(brand)}
                />
                <label
                  className="hover:underline hover:text-blue-700 cursor-pointer"
                  htmlFor={brand}
                >
                  {brand}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* price */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Price (KW)</h1>
        <hr className="my-2" />
        <div className="flex items-center">
          <input
            type="number"
            className=" flex-1 border min-w-0 p-1 rounded-sm"
            value={lowestPrice}
            onChange={e => setLowestPrice(e.target.value)}
          />
          <span className="text-gray-600 text-xs mx-1">To</span>
          <input
            type="number"
            className="flex-1 border min-w-0 p-1 rounded-sm mr-1"
            value={highestPrice}
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
