import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
// import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
export default function GuestCartItem({
  item,
  handleEditItem,
  handleRemoveItemFromCart,
}) {
  const { formatMessage, locale } = useIntl();
  const variant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };
  return (
    <motion.div
      layout
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="cart-item py-2 border-b"
    >
      <Link to={`/${locale}/c/${item.id}`}>
        <img
          className=""
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image}`}
          alt={`${item[`name_${locale}`]}`}
        />
      </Link>
      <div className="">
        <h1 className="font-semibold ">{`${item[`name_${locale}`]}`}</h1>
        <h1 className=" font-semibold text-sm mb-1 text-green-700">
          {formatMessage({ id: 'in-stock' })}
        </h1>
        <div className="flex items-center mb-2">
          <h1 className=" font-semibold">
            {formatMessage({ id: 'quantity' })}
          </h1>
          <select
            value={item.qty}
            onChange={e => handleEditItem(e.target.value, item)}
            className="pr-8 py-0 mx-2 form-select border-gray-400 border rounded"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="flex text-sm  items-center ">
          <button
            onClick={() => {
              handleRemoveItemFromCart(item.id, item.cart_id);
            }}
            className={`
                : 'bg-main-color'
              text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase `}
            style={{ width: '200px' }}
          >
            <h1 className="mx-2 whitespace-no-wrap">
              {formatMessage({ id: 'remove-from-cart' })}
            </h1>
          </button>
          {/* <button
            onClick={() => {
              if (item.itemInWishList) {
                handleRemoveItemFromWishlist(item.id);
              } else {
                handleAddItemToWishlist(item);
              }
            }}
            className={`${
              addToWishListButtonLoading
                ? 'bg-gray-300'
                : item.itemInWishList
                ? 'bg-main-color'
                : 'bg-green-700'
            }  text-main-text   p-2 rounded flex items-center justify-center mx-2 font-semibold uppercase`}
            style={{ width: '200px' }}
          >
            {addToWishListButtonLoading ? (
              <MoonLoader size={19} color="#b72b2b" />
            ) : item.itemInWishList ? (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-wishlist' })}
                </h1>
              </>
            ) : (
              <>
                <h1 className="mx-2">
                  {formatMessage({ id: 'add-to-wishlist' })}
                </h1>
              </>
            )}
          </button> */}
          {/* <button
            onClick={() => handleRemoveItemFromCart(item.id)}
            className="p-2 border uppercase border-main-color  text-main-color font-semibold rounded mx-2"
            style={{ width: '160px' }}
          >
            {formatMessage({ id: 'add-to-wishlist' })}
          </button> */}
        </div>
      </div>
      <div className="text-center font-bold">{item.price * item.qty} KD</div>
    </motion.div>
  );
}
