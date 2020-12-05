import React from 'react';
import { useIntl } from 'react-intl';
import GoogleMapsAddress from '../../GoogleMapsAddress';

export default function Address({ handleStepForward, address, setAddress }) {
  const { formatMessage } = useIntl();
  return (
    <div className="h-full">
      <div className="rounded-sm border mb-2 h-full">
        <GoogleMapsAddress setAddress={setAddress} />
        <div className="flex justify-end items-center p-2">
          <button
            disabled={!address}
            className={`px-3 py-1 ${
              address
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-gray-500 text-main-text cursor-not-allowed'
            } rounded font-semibold`}
            onClick={handleStepForward}
          >
            {formatMessage({ id: 'next' })}
          </button>
        </div>
      </div>
    </div>
  );
}
