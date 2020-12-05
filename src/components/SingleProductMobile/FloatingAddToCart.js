import React from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiShoppingCart } from 'react-icons/ti';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';

export default function FloatingAddToCart({
  handleSubstractQuantity,
  quantity,
  handleAddQuantity,
  itemInCart,
  handleRemoveFromCart,
  handleAddToCart,
  price,
  id,
  addToCartButtonLoading,
  inView,
}) {
  const { formatMessage } = useIntl();
  return (
    <CSSTransition
      in={inView && !itemInCart}
      timeout={200}
      unmountOnExit={true}
      classNames="floating-cart-button"
    >
      <div className={`floating-button border-t bg-second-nav-text-light`}>
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
        <div className="p-1 text-center">{quantity * price} SAR</div>
        <button
          onClick={() => {
            if (itemInCart) {
              handleRemoveFromCart(id);
            } else {
              handleAddToCart({ id, quantity });
            }
          }}
          className={`${
            addToCartButtonLoading
              ? 'bg-gray-300'
              : itemInCart
              ? 'bg-main-color'
              : 'bg-green-700'
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
                {formatMessage({ id: 'remove-from-cart' })}
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
      </div>
    </CSSTransition>
  );
}
