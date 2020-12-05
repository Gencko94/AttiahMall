import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function GuestCartItemMobile({
  item,
  EditItemFromCart,
  removefromCartButtonLoading,
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
      className="border-b "
    >
      <div className="py-2 cart__item-mobile">
        <Link to={`/${locale}/item/${item.id}}`}>
          <img
            className=""
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image}`}
            alt={`${item[`name_${locale}`]}`}
          />
        </Link>
        <div className="text-sm">
          <Link to={`/${locale}/item/${item.id}}`}>
            <h1 className="font-semibold text-base ">{`${
              item[`name_${locale}`]
            }`}</h1>
          </Link>
          <h1 className=" font-semibold text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </h1>
          <div className="text-red-700 font-bold text-base">
            {item.price * item.qty} KD
          </div>
          <div className=" flex items-center ">
            <h1 className=" font-semibold">
              {formatMessage({ id: 'quantity' })} :{' '}
            </h1>
            <select
              value={item.quantity}
              onChange={e => EditItemFromCart(e.target.value, item)}
              className="select-mobile  border-gray-400 border py-1 px-2 rounded mx-2"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromCart(item.id, item.cart_id);
          }}
          className={`${
            removefromCartButtonLoading === item.id
              ? 'bg-gray-300'
              : 'bg-main-color'
          }  text-main-text text-sm flex items-center justify-center flex-1 p-2 rounded uppercase  font-semibold`}
        >
          {removefromCartButtonLoading === item.id ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={20}
              width={20}
              visible={true}
            />
          ) : (
            <>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-cart' })}
              </h1>
            </>
          )}
        </button>
        {/* <button
          onClick={() => handleRemoveItem(item.id)}
          className="p-2 flex-1  text-sm border border-main-color text-main-color  rounded font-semibold mx-2  "
        >
          {formatMessage({ id: 'add-to-wishlist' })}
        </button> */}
      </div>
    </motion.div>
  );
}
