import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';

export default function CartItemMobile({
  item,
  handleRemoveItem,
  EditItemFromCart,
  removeButtonLoading,
}) {
  const { formatMessage } = useIntl();
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
        <img
          className=""
          style={{ maxHeight: '', maxWidth: '' }}
          src={item.photo}
          alt={item.name}
        />
        <div className="text-sm">
          <h1 className="font-semibold ">{item.name}</h1>
          <h1 className=" font-semibold text-green-700">
            {formatMessage({ id: 'in-stock' })}
          </h1>
          <div className="text-red-700 font-bold text-base">
            {item.price * item.quantity} SAR
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
            handleRemoveItem(item.id);
          }}
          className={`${
            removeButtonLoading === item.id ? 'bg-gray-300' : 'bg-main-color'
          }  text-main-text text-sm flex items-center justify-center flex-1 p-2 rounded  font-semibold`}
        >
          {removeButtonLoading === item.id ? (
            <MoonLoader size={18} color="#b72b2b" />
          ) : (
            <>
              <h1 className="mx-2 whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-cart' })}
              </h1>
            </>
          )}
        </button>
        <button
          onClick={() => handleRemoveItem(item.id)}
          className="p-2 flex-1  text-sm border border-main-color text-main-color  rounded font-semibold mx-2  "
        >
          {formatMessage({ id: 'add-to-wishlist' })}
        </button>
      </div>
    </motion.div>
  );
}
