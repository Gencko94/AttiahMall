import React from 'react';

import { Link } from 'react-router-dom';

export default function RelatedItems({ relatedData }) {
  return (
    <div className="mb-2 overflow-hidden">
      <div className=" mb-2 p-2">
        <h1 className="text-xl font-bold ">You may also like</h1>
      </div>
      <div className="related__items-container">
        {relatedData.map((item, i) => {
          return (
            <div key={i} className="" style={{ height: '350px' }}>
              <div className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg ">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.photos.small}
                    alt="something"
                    className=" h-auto w-full  "
                  />
                </Link>
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <Link
                    title={item.name}
                    className="hover:underline"
                    to={`/products/${item.id}`}
                  >
                    <h1 className="text-sm font-semibold text-clamp-2">
                      {item.name}
                    </h1>
                  </Link>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.price} <span className="text-xs ">KD</span>
                    </p>
                    {item.sale && (
                      <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                        {' '}
                        {item.priceBefore}{' '}
                        <span className="font-normal">KD</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
