import React from 'react';

import { Link } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';

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
                  <MultiClamp
                    className="text-sm  font-semibold"
                    clamp={2}
                    ellipsis="..."
                  >
                    <Link
                      title={item.name}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </MultiClamp>

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
    </div>
  );
}
