import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { DataProvider } from '../../contexts/DataContext';
import RecentlyViewedVertical from '../RecentlyViewedVertical';
import AcceptedPayments from './AcceptedPayments';
import FeaturedItemsVertical from './FeaturedItemsVertical';
import CartRightSideLoader from './loaders/CartRightSideLoader';

export default function CartRightSide({
  cartItemsLoading,
  cartItems,
  setCheckOutModalOpen,
  cartTotal,
}) {
  const { isAuthenticated } = React.useContext(AuthProvider);
  const { deliveryCountry } = React.useContext(DataProvider);
  const history = useHistory();
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
  const { formatMessage, locale } = useIntl();
  const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
  const handleCheckout = () => {
    if (isAuthenticated) {
      history.push(`/${locale}/checkout`);
    } else {
      setCheckOutModalOpen(true);
    }
  };
  return (
    <div
      className="font-semibold overflow-hidden  sticky top-0 self-start"
      style={{ top: '110px' }}
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
          <div className="flex items-center mb-2">
            <h1 className="text-gray-900 flex-1">
              {formatMessage({ id: 'delivery-cost' })}
            </h1>
            <h1 className="mx-1">
              {deliveryCountry?.delivery_cost === 0 ? (
                <span className="text-green-700 uppercase font-semibold">
                  {formatMessage({ id: 'cart-free' })}
                </span>
              ) : (
                deliveryCountry?.delivery_cost
              )}
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
            <h1>{cartTotal + deliveryCountry?.delivery_cost}</h1> KD
          </div>
          <button
            onClick={handleCheckout}
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
      <AcceptedPayments deliveryCountry={deliveryCountry} />
      <hr className="my-8" />
      {visitedItems.length > 4 ? (
        <RecentlyViewedVertical visitedItems={visitedItems} />
      ) : (
        <FeaturedItemsVertical />
      )}
    </div>
  );
}
