import React from 'react';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import manWithMap from '../../../assets/illustrations/manWithMap.svg';
export default function NoAddresses({ setShowMap }) {
  const { formatMessage } = useIntl();
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: 'calc(-176px + 100vh)' }}
    >
      <img
        src={manWithMap}
        alt="map"
        style={{ height: '250px' }}
        className="mb-6"
      />
      <div className="flex flex-col items-center">
        <h1 className="text-lg text-center font-semibold">
          {formatMessage({ id: 'no-addresses-yet' })}
        </h1>
        <button
          onClick={() => setShowMap(true)}
          className={` mt-3  font-semibold flex items-center rounded px-4 py-2 
           
             bg-btn-primary-light text-btn-secondary-light
            
           `}
        >
          <h1 className="mx-2 uppercase">
            {formatMessage({ id: 'add-new-address' })}
          </h1>
          <FaMapMarkedAlt className="w-20p h-20p" />
        </button>
      </div>
    </div>
  );
}
