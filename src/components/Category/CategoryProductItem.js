import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';

export default function CategoryProductItem({ item }) {
  const { locale, formatMessage } = useIntl();
  return (
    <div
      className={`overflow-hidden slider-item border  relative my-1
    shadow
   rounded`}
    >
      <span className="sale-mini__banner text-xs font-semibold bg-main-color text-main-text px-1 ">
        32% {formatMessage({ id: 'off' })}
      </span>
      <Link to={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
          alt={item.translation[locale].title}
          pb="calc(100% * 286/210)"
        />
      </Link>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '50px' }}>
          <Link
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            to={`/${locale}/c/${item.id}`}
          >
            <h1 className="text-clamp-2 text-xs">
              {item.translation[locale].title}
            </h1>
          </Link>
        </div>

        <div className=" py-1 px-3 flex items-center justify-between">
          <p className="   text-lg font-semibold text-main-color whitespace-no-wrap">
            50 <span className="text-xs ">KD</span>
          </p>
          {/* <button
            onClick={() => handleBuyOptionsToggle(item.id)}
            className=" rounded-full  p-2  shadow-itemsSlider-shallow relative text-body-light z-3 bg-main-color"
          >
            <TiShoppingCart
              style={{
                height: '20px',
                width: '20px',
                marginTop: '3px',
                marginRight: '2px',
              }}
            />
            <BsPlus
              className="w-4 h-4 absolute  "
              style={{ right: '4px', top: '3px' }}
            />
          </button> */}
          {/* {data.sale && (
                    <p className="text-xs mx-3  line-through text-gray-500  font-bold whitespace-no-wrap">
                      {' '}
                      {data.priceBefore} <span className="font-normal">KD</span>
                    </p>
                  )} */}
        </div>
      </div>
    </div>
  );
}
