import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';

export default function FloatingAddToCart({
  handleSubstractQuantity,
  quantity,
  handleAddQuantity,
  itemInCart,
  handleAddToCart,
  price,
  id,
  addToCartButtonLoading,
}) {
  const { formatMessage } = useIntl();
  const variants = {
    hidden: {
      y: '100%',
    },
    visible: {
      y: 0,
      transition: {
        type: 'tween',
        // duration: 200,
      },
    },
    exited: {
      y: '100%',
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`floating-button border-t bg-second-nav-text-light`}
    >
      <div className=" flex items-center justify-center flex-1">
        <button onClick={handleSubstractQuantity} className="p-1">
          <AiOutlineMinusCircle
            className={`w-6 h-6 ${
              quantity === 1 ? 'text-gray-700' : 'text-blue-700'
            }`}
          />
        </button>
        <span className="mx-2">{quantity}</span>
        <button onClick={handleAddQuantity} className="p-1">
          <AiOutlinePlusCircle className={`w-6 h-6 text-blue-700`} />
        </button>
      </div>
      <div className="p-1 text-center">{quantity * price} KD</div>
      <button
        onClick={() => {
          if (itemInCart) {
            return;
          } else {
            handleAddToCart({ id, quantity });
          }
        }}
        className={`${
          addToCartButtonLoading ? 'bg-gray-300' : 'bg-green-700'
        } flex-1 text-body-light uppercase text-sm py-2 px-2 rounded   flex items-center justify-center font-semibold`}
      >
        {addToCartButtonLoading ? (
          <MoonLoader size={19} color="#b72b2b" />
        ) : itemInCart ? (
          <>
            <span>
              <TiShoppingCart className="w-25p h-25p " />
            </span>
            <h1 className="mx-2 whitespace-no-wrap">
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
    </motion.div>
  );
}
