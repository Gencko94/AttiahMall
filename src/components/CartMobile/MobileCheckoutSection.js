import React from 'react';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import AcceptedPayments from '../Cart/AcceptedPayments';
import MobileCheckoutSectionLoader from './ContentLoaders/MobileCheckoutSectionLoader';

export default function MobileCheckoutSection({
  cartItems,
  cartItemsLoading,
  handleCheckout,
  cartTotal,
}) {
  const { deliveryCountry } = React.useContext(DataProvider);
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
  if (cartItemsLoading) {
    return (
      <div className="-mx-2 -mt-1">
        <MobileCheckoutSectionLoader locale={locale} />
      </div>
    );
  }
  return (
    <div className="-mx-2 -mt-1 border font-semibold bg-gray-100 p-2 flex justify-center flex-col ">
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
        <h1 className=" flex-1">{formatMessage({ id: 'delivery-cost' })}</h1>
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
      <div className="  flex mb-2  ">
        <h1 className="text-gray-900">{formatMessage({ id: 'cart-total' })}</h1>
        <h1 className="mx-1 whitespace-no-wrap flex-1">
          (
          {locale === 'ar'
            ? cartItems.length > 2 && cartItems.length
            : `${cartItems.length} `}
          {resolvePlural()})
        </h1>
        <h1>{cartTotal}</h1> SAR
      </div>
      <div className="  flex mb-2 ">
        <h1 className="flex-1 text-gray-900">
          {formatMessage({ id: 'subtotal' })}
        </h1>
        <h1>{cartTotal + deliveryCountry?.delivery_cost}</h1> SAR
      </div>
      <button
        onClick={handleCheckout}
        className="p-2 rounded mb-2 font-semibold block text-center uppercase text-sm  w-full text-gray-100 bg-green-600"
      >
        {formatMessage({ id: 'checkout' })}
      </button>
      <AcceptedPayments />
    </div>
  );
}
