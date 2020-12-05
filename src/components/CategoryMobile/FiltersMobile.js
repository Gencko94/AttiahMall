import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { MdClose } from 'react-icons/md';
export default function FiltersMobile({
  filtersOpen,
  setFiltersOpen,
  loading,
  categories,
  numberOfItems,
  handleCategoryChange,
  brands,
  brandFilters,
  handleBrandChange,
  highestPrice,
  setHighestPrice,
  lowestPrice,
  setLowestPrice,
  handlePriceChange,
}) {
  return (
    <CSSTransition
      in={filtersOpen}
      classNames={'search-filter-panel__mobile'}
      timeout={200}
      unmountOnExit
    >
      <div className="fixed left-0 top-0 z-8 h-full w-full bg-body-light overflow-auto">
        <div className="flex sticky top-0 left-0 w-full items-center justify-between px-3 py-2 bg-body-light border-b mb-1">
          <h1 className=" text-lg font-semibold">Filters</h1>
          <button onClick={() => setFiltersOpen(false)}>
            <MdClose className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-4 ">
          <h1 className="font-bold px-3 mb-1">Category</h1>
          {/* <hr className="my-2" /> */}
          {!loading &&
            Object.keys(categories).map(category => {
              return (
                <div className="my-2 px-3" key={category}>
                  <div className="flex justify-between mb-1">
                    <h1 className="font-semibold text-sm">{category}</h1>
                    <div>({numberOfItems[category]})</div>
                  </div>
                  {categories[category].map(subCategory => (
                    <div key={subCategory} className="flex px-2 mb-1">
                      <button
                        key={subCategory}
                        onClick={() => handleCategoryChange(subCategory)}
                        className="text-sm block hover:underline hover:text-blue-700"
                      >
                        {subCategory}
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
        <hr className="my-2" />
        <div className="mb-4">
          <h1 className=" font-bold px-3 mb-2">Brand</h1>
          <div className="flex flex-col justify-center px-4">
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
                    className="hover:underline text-sm hover:text-blue-700 cursor-pointer"
                    htmlFor={brand}
                  >
                    {brand}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <h1 className="px-3 font-bold">Price (KW)</h1>
          <hr className="my-2" />
          <div className="flex items-center px-3">
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
        <hr className="my-2" />
      </div>
    </CSSTransition>
  );
}
