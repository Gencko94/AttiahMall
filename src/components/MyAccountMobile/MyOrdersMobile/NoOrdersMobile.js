import React from 'react';
import { AiFillShopping } from 'react-icons/ai';
import shoppingLost from '../../../assets/illustrations/shoppingLost.svg';
export default function NoOrdersMobile() {
  return (
    <div
      className="  flex flex-col justify-center items-center p-4 "
      style={{ minHeight: 'calc(-120px + 100vh)' }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg text-center font-bold">
          You've not placed any Orders yet !
        </h1>
        <button className=" mt-3 font-semibold flex items-center rounded px-3 py-1 bg-red-600 text-gray-100">
          <span className="mr-1 text-white ">
            <AiFillShopping className="w-20p h-20p" />
          </span>
          Start shopping now !
        </button>
      </div>
      <img
        className="mt-5"
        style={{ height: '200px' }}
        src={shoppingLost}
        alt="lostManWallet"
      />
    </div>
  );
}
