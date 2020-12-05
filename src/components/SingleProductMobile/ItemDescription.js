import React from 'react';
import {
  AiFillStar,
  AiFillHeart,
  AiOutlineStar,
  AiOutlineHeart,
} from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import Colors from '../SingleProduct/Colors';
// import Sizes from '../SingleProduct/Sizes';
// import { scrollIntoView } from 'scroll-js';
import { DataProvider } from '../../contexts/DataContext';
import { MdLocationOn } from 'react-icons/md';
export default function ItemDescription({
  data,
  handleAddToCart,
  itemInCart,
  itemInWishList,
  quantity,
  setQuantity,
  addToCartButtonLoading,
  handleAddToWishList,
  userId,
  size,
  setSize,
  color,
  setColor,
  reviews,
  setDetailsTab,
  rating,
  handleRemoveFromWishList,
}) {
  const { formatMessage, locale } = useIntl();
  // const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const { deliveryCountry } = React.useContext(DataProvider);
  // const resolvePlural = () => {
  //   switch (reviews.length) {
  //     case 1:
  //       return formatMessage({ id: 'one-rating' });

  //     case 2:
  //       return formatMessage({ id: 'two-ratings' });

  //     case reviews.length > 10:
  //       return formatMessage({ id: 'one-rating' });

  //     default:
  //       return formatMessage({ id: 'ratings' });
  //   }
  // };
  const addToWishList = () => {
    if (!userId) {
      return;
      // setTimeout(() => {
      //   setSnackBarOpen(false);
      // }, 5000);
      // return;
    }
    if (itemInWishList) {
      handleRemoveFromWishList(data.id);
    } else {
      handleAddToWishList();
    }
  };
  return (
    <div className="mb-3">
      <h1 className="font-semibold text-xl">
        {data.translation[locale].title}
      </h1>
      <div className="flex items-center ">
        <Rating
          initialRating={4.5}
          emptySymbol={<AiOutlineStar className="text-red-700" />}
          fullSymbol={<AiFillStar className="text-red-700" />}
          className="pt-1"
        />

        {/* <div
          onClick={() => {
            scrollIntoView(document.getElementById('details'));
            setDetailsTab(1);
          }}
          className="text-sm mx-2 cursor-pointer"
        >
          <div className="text-sm text-gray-600 flex items-center  hover:underline">
            <h1>{reviews.length > 2 && reviews.length}</h1>
            <h1 className="mx-1">{resolvePlural()}</h1>
          </div>
        </div> */}
      </div>

      <h1 className=" font-semibold mb-1 text-green-600">
        {formatMessage({ id: 'in-stock' })}
      </h1>
      <h1 className="text-sm   mb-1 text-gray-700">
        {formatMessage({ id: 'model-number' })} : {data.simple_addons.sku}
      </h1>

      <hr />
      <div className=" mb-1 text-sm  font-bold">
        {data.simple_addons.promotion_price && (
          <div className="flex flex-wrap items-center">
            <h1 className=" ">{formatMessage({ id: 'price-before' })} :</h1>
            <h1 className=" text-base italic mx-2  line-through text-gray-700">
              {data.simple_addons.promotion_price} SAR
            </h1>
          </div>
        )}
        <div className="flex flex-wrap items-center">
          <h1 className="">
            {data.simple_addons.promotion_price
              ? formatMessage({ id: 'price-now' })
              : formatMessage({ id: 'price' })}{' '}
            :
          </h1>
          <h1 className=" text-xl mx-2 text-red-700">
            {data.simple_addons.price} SAR
          </h1>
          <h1 className=" font-normal  text-gray-700 uppercase">
            ({formatMessage({ id: 'vat-inclusive' })})
          </h1>
        </div>

        <h1 className="">
          {formatMessage({ id: 'you-save' })} :{' '}
          <span className=" text-xl  text-main-color">18%</span>{' '}
        </h1>
      </div>
      <div className="mb-2">
        <div className="flex justify-between items-center font-semibold  ">
          <div className="flex items-center ">
            <div className="flex items-center">
              <h1>{formatMessage({ id: 'deliver-to' })}</h1>
              <h1 className="uppercase mx-2 text-sm">
                {deliveryCountry?.translation[locale].name}
              </h1>
              <MdLocationOn className="w-5 h-5 text-main-color " />
            </div>
          </div>
          <button
            className={`px-2 text-xs uppercase bg-main-color text-main-text rounded`}
          >
            {formatMessage({ id: 'change' })}
          </button>
        </div>
        <div className="flex items-center">
          <h1 className="text-gray-700">
            {formatMessage({ id: 'estimated-delivery' })} :
          </h1>
          <h1 className="mx-1">
            {deliveryCountry?.delivery_time}
            <span className="mx-1">
              {deliveryCountry?.delivery_time === '1'
                ? formatMessage({ id: 'day' })
                : formatMessage({ id: 'days' })}
            </span>
          </h1>
        </div>
      </div>

      {/* {sizes && (
        <>
          <Sizes
            size={size}
            setSize={setSize}
            sizes={sizes}
            availableSizes={availableSizes}
          />
          <hr className="my-2" />
        </>
      )}
      {colors && (
        <>
          <Colors
            colors={colors}
            color={color}
            setColor={setColor}
            availableColors={availableColors}
          />
          <hr className="my-2" />
        </>
      )} */}
      <div className="relative flex items-center flex-wrap">
        <div className="flex items-center">
          <h1 className="font-semibold text-sm">
            {formatMessage({ id: 'quantity' })}
          </h1>

          <select
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="select-mobile border-gray-400 border py-1 px-2 rounded mx-1"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <button
          onClick={() => {
            if (itemInCart) {
              return;
            } else {
              handleAddToCart();
            }
          }}
          className={`${
            addToCartButtonLoading ? 'bg-gray-300' : 'bg-green-700'
          } text-main-text text-sm p-2 mx-1 rounded uppercase whitespace-no-wrap flex-1 flex items-center justify-center font-semibold`}
        >
          {addToCartButtonLoading ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={25}
              width={25}
              visible={addToCartButtonLoading}
            />
          ) : itemInCart ? (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p " />
              </span>
              <h1 className="mx-1 whitespace-no-wrap">
                {formatMessage({ id: 'added-to-cart' })}
              </h1>
            </>
          ) : (
            <>
              <span>
                <TiShoppingCart className="w-25p h-25p" />
              </span>
              <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
            </>
          )}
        </button>
        <button
          onClick={addToWishList}
          className={`
              border
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
        >
          {itemInWishList ? (
            <AiFillHeart
              className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
            />
          ) : (
            <AiOutlineHeart
              className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
            />
          )}
        </button>
      </div>
    </div>
  );
}
