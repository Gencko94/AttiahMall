import React from 'react';
import { DataProvider } from '../../contexts/DataContext';

export default function OtherShops() {
  const {
    stores,
    storesFlags,
    currentStore,
    setCurrentStore,
  } = React.useContext(DataProvider);

  return (
    <div className="flex justify-around items-center flex-wrap   px-5 ">
      <h1 className="text-lg font-bold text-center">
        Order from our Worldwide stores
      </h1>
      <div className="flex justify-between gap-3 ml-2  flex-1">
        {stores.map(store => {
          return (
            <div
              key={store}
              onClick={() => setCurrentStore(store)}
              className={`flex cursor-pointer items-center justify-center rounded-lg shadow-sm hover:bg-red-700 hover:text-gray-100 transition duration-150  px-2 ${
                currentStore === store ? 'bg-red-700 text-gray-100' : ''
              }`}
              //   style={{ maxWidth: '121px' }}
            >
              <img
                className="w-25p h-25p"
                src={storesFlags[store]}
                alt={store}
              />
              <button className="flex p-2 ">
                <h1 className="uppercase font-semibold ">{store}</h1>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
