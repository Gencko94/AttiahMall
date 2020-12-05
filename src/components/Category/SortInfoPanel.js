import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { CSSTransition } from 'react-transition-group';

export default function SortInfoPanel({
  queryData,
  loading,
  query,
  sortBy,
  handleSortByChange,
  setSortBy,
}) {
  const [sortByOpen, setSortByOpen] = React.useState(false);
  const sortByOptions = [
    'Popularity',
    'Price (High to Low)',
    'Price (Low to High)',
  ];
  return (
    <div className="flex items-center">
      <h1 className=" flex-1">
        {!loading && queryData.length} Search results for{' '}
        <span className="font-semibold">{query}</span>
      </h1>
      <div className="flex justify-end flex-1 font-semibold">
        <div className="flex items-center relative">
          <h1 className="mr-2">Sort By</h1>
          <button
            onClick={() => setSortByOpen(!sortByOpen)}
            className="border items-center flex px-2 py-1 rounded-sm"
          >
            <span className="mr-2">{sortBy}</span>
            <BiCaretDown />
          </button>
          <CSSTransition
            in={sortByOpen}
            timeout={100}
            classNames="sortby-box"
            unmountOnExit
          >
            <div className="absolute z-1 top-100 left-0 bg-body-light border rounded mt-1">
              {sortByOptions.map(option => {
                return (
                  <button
                    key={option}
                    onClick={() => {
                      setSortByOpen(false);
                      setSortBy(option);
                      handleSortByChange(option);
                    }}
                    className={`text-sm px-2 py-1 ${
                      sortBy === option &&
                      'bg-second-nav-light text-second-nav-text-light'
                    } hover:bg-second-nav-light hover:text-second-nav-text-light w-full`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </CSSTransition>
        </div>
      </div>
    </div>
  );
}
