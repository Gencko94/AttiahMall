import React from 'react';
import { useIntl } from 'react-intl';

export default function Colors({
  colors,
  availableColors,
  setColor,
  color,
  data,
  setSelectedVariant,
}) {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1 className="font-semibold mb-2 text-sm">
        {formatMessage({ id: 'single-product-color' })}:
      </h1>
      <div className="single-product-sizes__container">
        {data.map((variation, i) => {
          // const available = availableColors.includes(iColor);
          return (
            <button
              onClick={() => setSelectedVariant(i)}
              key={variation.id}
              // className={`${!available && 'color-disabled'}`}
            >
              {/* <button
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
              ></button> */}
              <img
                alt={variation.id}
                style={{ width: '50px', height: '75px' }}
                src={`${process.env.REACT_APP_IMAGES_URL}/original/${variation.image.link}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
