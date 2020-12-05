import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { useIntl } from 'react-intl';

import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function BuyOptions({
  item,
  setQuantity,
  size,
  quantity,
  setSize,
  handleAddToCart,
  handleRemoveFromCart,
  loadingButton,
  cartItems,
}) {
  const { formatMessage, locale } = useIntl();
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const buyOptionsVariants = {
    hidden: {
      clipPath: ' circle(5% at 86% 92%)',
    },
    visible: {
      clipPath: ' circle(72.5% at 50% 50%)',
      transition: {
        type: 'tween',
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exited: {
      clipPath: ' circle(5% at 86% 92%)',
      transition: {
        type: 'tween',
      },
    },
  };
  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      opacity: 0,
    },
  };
  const handleAddQuantity = () => {
    if (quantity < item.simple_addons.quantity) {
      setQuantity(quantity + 1);
    }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  return (
    <motion.div
      variants={buyOptionsVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="buy-options__itemslider"
    >
      <div className="p-1">
        <h1 className="text-xs font-semibold text-center text-body-light truncate">
          {item.translation[locale].title}
        </h1>
      </div>
      <hr />
      <motion.div variants={childVariants}>
        <div className="px-2 py-1 text-sm  text-body-light font-bold text-center ">
          <h1 className="">{formatMessage({ id: 'size' })}</h1>
        </div>
        <div className="px-2  flex items-center justify-center flex-wrap text-xs">
          {sizes.map(unit => {
            return (
              <button
                key={unit}
                onClick={() => setSize(unit)}
                className={`w-6 h-6 uppercase  font-semibold rounded p-1 flex items-center justify-center transition duration-150 m-1  shadow-itemsSlider-shallow ${
                  size === unit
                    ? 'bg-buy-options-main shadow-itemsSlider-shallow text-main-text'
                    : 'bg-body-light  text-body-text-light'
                } `}
              >
                {unit}
              </button>
            );
          })}
        </div>
      </motion.div>
      <motion.div variants={childVariants}>
        <div className="p-1">
          <h1 className="text-sm font-semibold text-center text-body-light">
            {formatMessage({ id: 'quantity' })}
          </h1>
        </div>

        <div className="px-2 flex  justify-center">
          <button onClick={handleSubstractQuantity} className="">
            <AiOutlineMinusCircle className="w-5 h-5   text-body-light" />
          </button>
          <div className="mx-2 rounded-full px-3 py-1 flex items-center justify-center bg-body-light">
            {quantity}
          </div>
          <button onClick={handleAddQuantity} className="">
            <AiOutlinePlusCircle className="w-5 h-5  text-body-light" />
          </button>
        </div>
      </motion.div>
      <motion.div variants={{ childVariants }} className="px-2 mt-2 ">
        <button
          onClick={() => {
            console.log('remove');
            if (cartItems.includes(item.id)) {
              handleRemoveFromCart(item.id);
            } else {
              console.log('add');
              handleAddToCart({ id: item.id, quantity: quantity, size });
            }
          }}
          className={`${
            loadingButton === item.id
              ? 'bg-gray-300'
              : cartItems.includes(item.id)
              ? 'bg-main-color'
              : 'bg-green-700'
          } flex-1 text-main-text shadow-itemsSlider-shallow uppercase  p-2 rounded-lg text-xs sm:text-sm w-full transition duration-150   flex items-center justify-center font-semibold`}
        >
          {loadingButton === item.id ? (
            <Loader
              type="ThreeDots"
              color="#b72b2b"
              height={21}
              width={21}
              visible={true}
            />
          ) : cartItems.includes(item.id) ? (
            <>
              <h1 className="whitespace-no-wrap">
                {formatMessage({ id: 'remove-from-cart' })}
              </h1>
            </>
          ) : (
            <>
              <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
            </>
          )}
        </button>
      </motion.div>
    </motion.div>
  );
}
