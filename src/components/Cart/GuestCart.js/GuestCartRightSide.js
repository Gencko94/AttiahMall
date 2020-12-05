import React from 'react';
import { useIntl } from 'react-intl';
import CartRightSideLoader from '../loaders/CartRightSideLoader';
import FeaturedItemsVertical from '../FeaturedItemsVertical';
export default function GuestCartRightSide({
  cartItemsLoading,
  cartItems,
  cartTotal,
}) {
  const { formatMessage, locale } = useIntl();
  const resolvePlural = () => {
    switch (cartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case cartItems.length > 10:
        return formatMessage({ id: 'one-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  return (
    <div
      className="font-semibold overflow-hidden  sticky top-0"
      style={{ top: '134px' }}
    >
      {cartItemsLoading && <CartRightSideLoader locale={locale} />}
      {!cartItemsLoading && cartItems.length !== 0 && (
        <div className=" rounded border bg-gray-100 p-2 flex justify-center flex-col mb-2 ">
          <div className="mb-2 ">
            <div className="rounded border w-full flex  overflow-hidden">
              <input
                type="text"
                placeholder={formatMessage({ id: 'cart-enter-code-or-coupon' })}
                className="flex-1 placeholder-gray-700  p-2"
              />
              <button className="bg-main-color text-main-text p-2 ">
                {formatMessage({ id: 'cart-code-button' })}
              </button>
            </div>
          </div>
          <div className=" mb-2  flex items-center">
            <h1 className="flex-1 text-gray-900">
              {formatMessage({ id: 'cart-delivery-cost' })}
            </h1>
            <h1 className="text-green-700">
              {formatMessage({ id: 'cart-free' })}
            </h1>
          </div>
          <div className=" flex mb-2  ">
            <h1 className="text-gray-900">
              {formatMessage({ id: 'cart-total' })}
            </h1>
            <h1 className="mx-1 whitespace-no-wrap flex-1">
              (
              {locale === 'ar'
                ? cartItems.length > 2 && cartItems.length
                : `${cartItems.length} `}
              {resolvePlural()})
            </h1>
            <h1>{cartTotal}</h1> KD
          </div>
          <div className="  flex mb-2 ">
            <h1 className="flex-1 text-gray-900">
              {formatMessage({ id: 'subtotal' })}
            </h1>
            <h1>{cartTotal}</h1> KD
          </div>
          <button
            // onClick={handleCheckout}
            className={`${
              cartItems.length === 0
                ? 'cursor-not-allowed  bg-gray-600'
                : 'bg-green-600'
            } p-2 rounded text-body-light uppercase  `}
            disabled={cartItems.length === 0}
          >
            {formatMessage({ id: 'checkout' })}
          </button>
        </div>
      )}
      <FeaturedItemsVertical />
      {/* {visitedItems.length > 4 ? (
        <RecentlyViewedVertical visitedItems={visitedItems} />
      ) : (
        
      )} */}
    </div>
  );
}
