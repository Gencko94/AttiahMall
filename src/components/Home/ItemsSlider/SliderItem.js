import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { BsPlus } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import BuyOptions from './BuyOptions';

export default function SliderItem({
  data,
  isLightTheme,
  isItemInCart,
  activeBuyOptions,
  loadingButton,
  setSize,

  setQuantity,
  handleBuyOptionsToggle,
  options,
  addMutation,
  removeMutation,
}) {
  const { locale } = useIntl();

  const handleAddItemToCart = async data => {
    try {
      await addMutation({
        id: data.id,
        photo: data.photos.small,
        quantity: options.quantity,
        price: data.price,
        name: data.name,
        options,
        category: data.category,
        rating: data.rating,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveItemFromCart = async data => {
    try {
      await removeMutation(data);
    } catch (error) {}
  };

  return (
    <div className="my-4  px-2   ">
      <div
        className={`overflow-hidden flex flex-col relative ${
          isLightTheme ? 'shadow-itemsSlider-shallow' : 'shadow-itemsSlider'
        } rounded`}
      >
        <span className="sale-mini__banner text-xs font-semibold bg-main-color text-main-text px-1 ">
          50% OFF
        </span>
        <a
          href={`/${locale}/${data.category.replace(
            /\s|%|,/g,
            '-'
          )}/${data.name.replace(/\s|%|,|-/g, '-')}/${data.id}`}
        >
          <img
            title={data.name}
            src={data.photos.small}
            alt={data.name}
            className=""
          />
        </a>
        <hr />

        <div
          className={` 
                    
                      ${
                        isLightTheme
                          ? 'bg-body-light text-body-text-light'
                          : 'bg-body-dark text-body-text-dark'
                      }`}
        >
          <div className="p-2" style={{ height: '40px' }}>
            <a
              title={data.name}
              className="hover:underline"
              href={`/${locale}/${data.category.replace(
                /\s|%|,/g,
                '-'
              )}/${data.name.replace(/\s|%|,|-/g, '-')}/${data.id}`}
            >
              <MultiClamp
                className="text-sm text-gray-800"
                clamp={2}
                ellipsis="..."
              >
                {data.name}
              </MultiClamp>
            </a>
          </div>

          <div className=" py-2 px-3 flex items-center justify-between">
            <p className="   text-lg font-semibold text-main-color whitespace-no-wrap">
              {data.price} <span className="text-xs ">SAR</span>
            </p>
            <button
              onClick={() => handleBuyOptionsToggle(data.id)}
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
          {activeBuyOptions === data.id && (
            <BuyOptions
              setQuantity={setQuantity}
              data={data}
              options={options}
              setSize={setSize}
              loadingButton={loadingButton}
              isItemInCart={isItemInCart}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              handleAddItemToCart={handleAddItemToCart}
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
