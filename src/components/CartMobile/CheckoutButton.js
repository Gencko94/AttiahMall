import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function CheckoutButton({ data, cartTotal }) {
  const { locale, formatMessage } = useIntl();
  return (
    <div className="py-1 bg-white cart__checkout-sticky z-5 mb-2 border-b">
      <h1 className="text-lg font-semibold mb-1 ">
        Subtotal ({data.length}
        {data.length === 1 ? 'item' : 'items'}) :
        <span className="text-red-700 font-bold">{cartTotal} SAR</span>
      </h1>
      <Link
        to={`/${locale}/checkout/quickcheckout`}
        className="p-2 rounded font-semibold block text-center  w-full text-gray-100 bg-green-600"
      >
        {formatMessage({ id: 'checkout' })}
      </Link>
    </div>
  );
}
