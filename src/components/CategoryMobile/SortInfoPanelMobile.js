import React from 'react';
import { BiFilter, BiFilterAlt } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
export default function SortInfoPanelMobile({
  loading,
  queryData,
  query,

  filtersApplied,

  handleBrandChange,
  setFiltersOpen,
  setSortByOpen,
  brandFilters,
}) {
  return (
    <div>
      <h1 className="p-2">
        {!loading && queryData.length} Search results for{' '}
        <span className="font-semibold">{query}</span>
      </h1>
      <div className="flex items-center justify-center mb-1 ">
        <button
          onClick={() => setFiltersOpen(true)}
          className="p-2 flex items-center border flex-1 justify-center bg-gray-300 "
        >
          <span className="mr-3">Filters</span>{' '}
          <BiFilterAlt className="w-5 h-5" />
        </button>
        <button
          onClick={() => setSortByOpen(true)}
          className="p-2 flex items-center border flex-1 justify-center bg-gray-300"
        >
          <span className="mr-3">Sort By</span> <BiFilter className="w-6 h-6" />
        </button>
      </div>
      {filtersApplied && (
        <div className="py-2 px-3 flex-wrap flex items-center ">
          <h1 className="text-sm font-semibold mr-3 mb-1">Filtered By</h1>
          <div className="flex items-center overflow-x-auto mobile-tabs">
            {brandFilters.map(brand => (
              <button
                key={brand}
                className="px-2 py-1 mr-3 flex border rounded items-center"
              >
                <h1 className="text-xs text-gray-500 mr-2 whitespace-no-wrap">
                  Brand :{' '}
                </h1>
                <h1 className="text-xs font-bold mr-2 whitespace-no-wrap ">
                  {brand}
                </h1>
                <MdClose
                  onClick={() => handleBrandChange(brand)}
                  className="hover:text-red-700"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
