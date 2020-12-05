import React from 'react';
import { MdClose } from 'react-icons/md';
import { CgRadioCheck, CgRadioChecked } from 'react-icons/cg';
import { CSSTransition } from 'react-transition-group';

export default function SortByMobile({
  setSortByOpen,
  sortByOpen,
  sortBy,
  setSortBy,
  handleSortByChange,
}) {
  const sortByOptions = [
    'Popularity',
    'Price (High to Low)',
    'Price (Low to High)',
  ];
  return (
    <CSSTransition
      in={sortByOpen}
      classNames={'search-sort-panel__mobile'}
      timeout={200}
      unmountOnExit
    >
      <div className="fixed left-0 top-0 z-8 h-full w-full bg-body-light overflow-auto">
        <div className="flex sticky top-0 left-0 w-full items-center justify-between px-3 py-2 bg-body-light border-b mb-1">
          <h1 className=" text-lg font-semibold">Sort By</h1>
          <button onClick={() => setSortByOpen(false)}>
            <MdClose className="w-6 h-6" />
          </button>
        </div>
        <div>
          {sortByOptions.map(option => {
            return (
              <button
                key={option}
                onClick={() => {
                  setSortByOpen(false);
                  setSortBy(option);
                  handleSortByChange(option);
                }}
                className={`px-3 py-2 flex items-center justify-between ${
                  sortBy === option &&
                  'bg-second-nav-light text-second-nav-text-light'
                } hover:bg-second-nav-light hover:text-second-nav-text-light w-full`}
              >
                <span>{option}</span>
                {sortBy === option ? <CgRadioChecked /> : <CgRadioCheck />}
              </button>
            );
          })}
        </div>
        <hr className="my-2" />
      </div>
    </CSSTransition>
  );
}
