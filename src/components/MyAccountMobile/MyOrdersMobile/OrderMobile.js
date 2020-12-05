import React from 'react';
import { useIntl } from 'react-intl';

export default function OrderMobile({ order, setSelectedOrder, isLightTheme }) {
  const { formatMessage } = useIntl();
  return (
    <div className=" bg-body-light border overflow-hidden rounded-lg ">
      <div
        className={` text-body-text-dark  px-2 py-1 font-semibold   ${
          order.delivered ? 'bg-green-700 ' : 'bg-orange-500 '
        }`}
      >
        <h1>
          {formatMessage({ id: 'status' })} :{' '}
          {order.delivered
            ? formatMessage({ id: 'delivered' })
            : formatMessage({ id: 'pending' })}
        </h1>
      </div>
      <div className=" text-sm mr-2 p-2 my-orders-grid__mobile">
        <div>
          <div className="flex items-center">
            <h1 className="text-gray-600">
              {formatMessage({ id: 'order-number' })} :
            </h1>
            <h1 className="mx-1">{order.orderNo}</h1>
          </div>
          <div className="flex items-center">
            <h1 className="text-gray-600">
              {formatMessage({ id: 'ordered-at' })} :
            </h1>
            <h1 className="mx-1 ">{order.orderDate}</h1>
          </div>
          <div className="flex items-center">
            <h1 className="text-gray-600">
              {order.delivered
                ? formatMessage({ id: 'delivered-at' })
                : formatMessage({ id: 'expected-delivery' })}{' '}
              :
            </h1>
            <h1 className=" mx-1">
              {order.delivered ? order.deliveryDate : order.expectedDelivery}
            </h1>
          </div>
          <div className=" mt-8">
            <button
              onClick={() => setSelectedOrder(order)}
              className="px-3 py-1 text-body-text-dark bg-blue-700 uppercase  rounded font-semibold"
            >
              {formatMessage({ id: 'order-details' })}
            </button>
          </div>
        </div>
        <div className="">
          <img src={order.orderItems[0].photos.small} alt={order.orderNo} />
        </div>
      </div>
    </div>
  );
}
