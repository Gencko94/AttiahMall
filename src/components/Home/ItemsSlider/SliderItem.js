import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { BsPlus } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import BuyOptions from './BuyOptions';
import { useHistory } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
export default function SliderItem({
  item,
  isItemInCart,
  activeBuyOptions,
  loadingButton,
  setSize,
  handleAddToCart,
  handleRemoveFromCart,
  setQuantity,
  handleBuyOptionsToggle,
  options,
  cartItems,
}) {
  const { locale } = useIntl();

  const history = useHistory();
  return (
    <div className="my-4  px-2   ">
      <div
        className={`overflow-hidden slider-item relative
         shadow-itemsSlider-shallow
         rounded`}
      >
        {/* <span className="sale-mini__banner text-xs font-semibold bg-main-color text-main-text px-1 ">
          50% OFF
        </span> */}
        <a href={`/${locale}/c/${item.id}`}>
          {/* <LazyLoadImage
            title={item.translation[locale].title}
            src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
            alt={item.translation[locale].title}
            effect="blur"
            placeholderSrc={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image.link}`}
            // height="auto"
          /> */}
          <img
            title={item.translation[locale].title}
            src={`${process.env.REACT_APP_IMAGES_URL}/medium/${item.image.link}`}
            alt={item.translation[locale].title}
            className=""
          />
        </a>
        {/* <hr /> */}

        <div
          className={` 
                    
                     
                         bg-body-light text-body-text-light
                          
                      `}
        >
          <div className="p-2" style={{ height: '40px' }}>
            <a
              title={item.translation[locale].title}
              className="hover:underline"
              href={`/${locale}/c/${item.id}`}
            >
              <MultiClamp className=" text-gray-800" clamp={2} ellipsis="...">
                {item.translation[locale].title}
              </MultiClamp>
            </a>
          </div>

          <div className=" py-2 px-3 flex items-center justify-between">
            <p className="   text-lg font-semibold text-main-color whitespace-no-wrap">
              50 <span className="text-xs ">SAR</span>
            </p>
            <button
              onClick={() => handleBuyOptionsToggle(item.id)}
              className=" rounded-full  p-2  shadow-itemsSlider-shallow relative text-body-light z-3 bg-main-color"
            >
              <TiShoppingCart
                style={{
                  height: '25px',
                  width: '25px',
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
                {data.priceBefore} <span className="font-normal">SAR</span>
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
              options={options}
              setSize={setSize}
              loadingButton={loadingButton}
              isItemInCart={isItemInCart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToCart={handleAddToCart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
/* <div className="px-2">
            <button
              onClick={() => {
                if (isItemInCart(data.id)) {
                  handleRemoveItemFromCart(data.id);
                } else {
                  handleAddItemToCart(data);
                }
              }}
              className={`${
                loadingButton === data.id
                  ? 'bg-gray-300'
                  : isItemInCart(data.id)
                  ? 'bg-main-color'
                  : 'bg-blue-700'
              } flex-1 text-main-text  p-1 px-2 my-1 rounded text-xs w-full   flex items-center justify-center font-semibold`}
            >
              {loadingButton === data.id ? (
                <MoonLoader size={15} color="#b72b2b" />
              ) : isItemInCart(data.id) ? (
                <>
                  <h1 className="whitespace-no-wrap">
                    {formatMessage({ id: 'remove-from-cart' })}
                  </h1>
                </>
              ) : (
                <>
                  <span>
                    <TiShoppingCart className="w-20p h-20p" />
                  </span>
                  <h1 className="mx-2">
                    {formatMessage({ id: 'add-to-cart' })}
                  </h1>
                </>
              )}
            </button>
          </div> */
