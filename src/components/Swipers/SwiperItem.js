import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import LazyImage from '../../helpers/LazyImage';
import BuyOptions from '../Home/ItemsSlider/BuyOptions';
export default function SwiperItem({
  cartItems,
  item,
  loadingButton,
  handleAddToCart,
  handleRemoveFromCart,
}) {
  const { formatMessage, locale } = useIntl();
  const [activeBuyOptions, setActiveBuyOptions] = React.useState(null);
  const [size, setSize] = React.useState('xs');
  const [quantity, setQuantity] = React.useState(1);
  const handleBuyOptionsToggle = id => {
    if (activeBuyOptions === id) {
      setActiveBuyOptions(null);
      setQuantity(1);
      setSize('xs');
      return;
    }
    setActiveBuyOptions(id);
    setSize('xs');
    setQuantity(1);
  };
  return (
    <>
      <span className="sale-mini__banner text-xs font-semibold bg-main-color text-main-text px-1 ">
        32% {formatMessage({ id: 'off' })}
      </span>
      <a href={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
          alt={item.translation[locale].title}
          pb="calc(100% * 286/210)"
        />
      </a>

      <div className={`bg-body-light text-body-text-light`}>
        <div className="p-2" style={{ height: '50px' }}>
          <a
            title={item.translation[locale].title}
            className="hover:underline inline-block"
            href={`/${locale}/c/${item.id}`}
          >
            <h1 className="text-clamp-2 text-xs">
              {item.translation[locale].title}
            </h1>
          </a>
        </div>

        <div className=" py-1 px-3 flex items-center justify-between">
          <p className="   text-lg font-semibold text-main-color whitespace-no-wrap">
            50 <span className="text-xs ">SAR</span>
          </p>
          <button
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
          </button>
          {/* {data.sale && (
                    <p className="text-xs mx-3  line-through text-gray-500  font-bold whitespace-no-wrap">
                      {' '}
                      {data.priceBefore} <span className="font-normal">KD</span>
                    </p>
                  )} */}
        </div>
      </div>
      <AnimatePresence>
        {activeBuyOptions === item.id && (
          <BuyOptions
            cartItems={cartItems}
            setQuantity={setQuantity}
            item={item}
            size={size}
            quantity={quantity}
            setSize={setSize}
            loadingButton={loadingButton}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>
    </>
  );
}
