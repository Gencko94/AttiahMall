import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchItemsGridMobile({
  queryData,
  filteredData,
  filtersApplied,
}) {
  return (
    <div className="search-page-items-mobile__grid px-1 my-1">
      {!filtersApplied &&
        queryData.map((item, i) => {
          return (
            <div key={i} className="">
              <div className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg ">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.photos.small}
                    alt="something"
                    className="w-full h-auto  "
                  />
                </Link>
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <h1 className="text-clamp-2 text-sm font-semibold">
                    <Link
                      title={item.name}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </h1>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.price} <span className="text-xs ">SAR</span>
                    </p>
                    {item.sale && (
                      <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                        {' '}
                        {item.priceBefore}{' '}
                        <span className="font-normal">SAR</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {filtersApplied &&
        filteredData.map((item, i) => {
          return (
            <div key={i} className="">
              <div className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg ">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.photos.small}
                    alt="something"
                    className="w-full h-auto  "
                  />
                </Link>
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <h1 className="text-clamp-2 text-sm font-semibold">
                    <Link
                      title={item.name}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </h1>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.price} <span className="text-xs ">SAR</span>
                    </p>
                    {item.sale && (
                      <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                        {' '}
                        {item.priceBefore}{' '}
                        <span className="font-normal">SAR</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
