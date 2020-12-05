import React from 'react';
import { useIntl } from 'react-intl';

export default function Sizes({ sizes, availableSizes, size, setSize }) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2 text-sm">
        {formatMessage({ id: 'single-product-size' })}:
      </h1>
      <div className="single-product-sizes__container">
        {sizes.map(iSize => {
          const available = availableSizes.includes(iSize);
          const selected = size === iSize;
          return (
            <button
              onClick={() => setSize(iSize)}
              key={iSize}
              disabled={!available}
              className={`${
                available
                  ? 'hover:bg-main-color hover:text-main-text transition duration-150'
                  : 'opacity-25 cursor-not-allowed'
              } p-2 uppercase border text-sm text-center ${
                selected
                  ? 'bg-main-color text-main-text'
                  : 'text-body-text-light'
              } `}
            >
              {iSize}
            </button>
          );
        })}
      </div>
    </div>
  );
}
