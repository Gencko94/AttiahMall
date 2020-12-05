import React from 'react';
import { AiFillShopping } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import shoppingLost from '../../../assets/illustrations/shoppingLost.svg';
export default function NoOrdersMobile() {
  const { formatMessage } = useIntl();
  return (
    <div
      className="  flex flex-col justify-center items-center p-4 "
      style={{ minHeight: 'calc(-176px + 100vh)' }}
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg text-center font-bold">
          {formatMessage({ id: 'no-orders-placed' })}
        </h1>
        <button className=" mt-3 font-semibold flex items-center rounded px-3 py-1 bg-main-color text-main-text">
          <h1 className="uppercase mx-2">
            {formatMessage({ id: 'start-shopping-now' })}
          </h1>
          <span className="text-white ">
            <AiFillShopping className="w-20p h-20p" />
          </span>
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
