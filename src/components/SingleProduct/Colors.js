import React from 'react';
import { useIntl } from 'react-intl';

export default function Colors({ colors, availableColors, setColor, color }) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2 text-sm">
        {formatMessage({ id: 'single-product-color' })}:
      </h1>
      <div className="single-product-sizes__container">
        {colors.map(iColor => {
          const available = availableColors.includes(iColor);
          return (
            <div key={iColor} className={`${!available && 'color-disabled'}`}>
              <button
                onClick={() => setColor(iColor)}
                disabled={!available}
                className={`${
                  available
                    ? 'hover:opacity-75 transition duration-150'
                    : 'opacity-25 cursor-not-allowed'
                }  uppercase ${
                  color === iColor ? 'border-main-color border' : 'border'
                } text-sm text-center w-full h-full `}
                style={{ backgroundColor: iColor }}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
