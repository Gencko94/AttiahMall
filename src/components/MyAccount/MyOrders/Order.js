import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
export default function Order({ order }) {
  const { formatMessage } = useIntl();
  const [isOpen, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!isOpen);
  };
  return (
    <motion.div layout className="rounded border">
      <motion.div
        layout
        className={` text-body-text-dark  px-2 py-1 font-semibold  ${
          order.delivered ? 'bg-green-700 ' : 'bg-orange-500 '
        }`}
      >
        <h1>
          {formatMessage({ id: 'status' })} :{' '}
          {order.delivered
            ? formatMessage({ id: 'delivered' })
            : formatMessage({ id: 'pending' })}
        </h1>
      </motion.div>
      <motion.div layout className="my-orders-grid__desktop text-sm p-2">
        <motion.div layout>
          <h1 className="font-semibold ">
            {formatMessage({ id: 'order-number' })} : {order.orderNo}
          </h1>
          <div className="flex items-center">
            <h1 className="">{formatMessage({ id: 'order-date' })} :</h1>
            <h1 className="text-gray-600 mx-1">{order.orderDate}</h1>
          </div>
          <div className="flex items-center">
            <h1 className="">
              {order.delivered
                ? formatMessage({ id: 'delivered-at' })
                : formatMessage({ id: 'expected-delivery' })}{' '}
              :
            </h1>
            <h1 className="mx-1 text-gray-600">
              {order.delivered ? order.deliveryDate : order.expectedDelivery}
            </h1>
          </div>
          <div className="flex items-center">
            <h1 className="">
              {order.delivered
                ? formatMessage({ id: 'delivered-to' })
                : formatMessage({ id: 'deliver-to' })}
              :
            </h1>
            <h1 className="mx-1 text-gray-600"> {order.deliveryDestination}</h1>
          </div>
          <div className="flex items-center">
            <h1>{formatMessage({ id: 'payment-method' })}:</h1>
            <h1 className="text-gray-600 mx-1">K-net</h1>
          </div>
        </motion.div>
        <motion.div layout>
          <img src={order.orderItems[0].photos.small} alt={order.orderNo} />
        </motion.div>
      </motion.div>
      <motion.div layout className="p-2 flex items-center ">
        <h1>{formatMessage({ id: 'show-order-receipt' })}</h1>
        <button
          onClick={toggleOpen}
          className="p-1 mx-2 border rounded-full shadow-md"
        >
          {isOpen ? (
            <BiChevronUp className="h-6 w-6" />
          ) : (
            <BiChevronDown className="h-6 w-6" />
          )}
        </button>
      </motion.div>
      {isOpen && <hr />}
      <AnimatePresence>
        {isOpen && (
          <Content
            orderItems={order.orderItems}
            orderAmount={order.orderAmount}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const Content = ({ orderItems, orderAmount }) => {
  const { locale, formatMessage } = useIntl();
  const containerVariants = {
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="my-orders-items__grid-desktop p-2"
    >
      <div className="my-orders-items__table-desktop font-semibold ">
        <h1>#</h1>
        <h1>{formatMessage({ id: 'the-item' })}</h1>
        <h1>{formatMessage({ id: 'price' })}</h1>
      </div>
      <br />
      {orderItems.map((orderItem, i) => {
        return (
          <div key={orderItem.id} className="my-orders-item-desktop text-sm">
            <div className="">
              <h1 className="">{i + 1}</h1>
            </div>
            <Link
              to={`/${locale}/${orderItem.category.replace(
                /\s|%|,/g,
                '-'
              )}/${orderItem.name.replace(/\s|%|,|-/g, '-')}/${orderItem.id}`}
              className="hover:underline"
            >
              <h1 className="truncate  semibold">{orderItem.name}</h1>
            </Link>
            <div className="">
              <h1 className="">{orderItem.price}</h1>
            </div>
          </div>
        );
      })}
      <hr className="my-1" />
      <div className="my-orders-receipt-summary font-bold text-sm">
        <h1>{formatMessage({ id: 'cart-total' })}</h1>
        <h1>{orderAmount}</h1>
        <h1>{formatMessage({ id: 'cart-delivery-cost' })}</h1>
        <h1 className="mb-2">{formatMessage({ id: 'cart-free' })}</h1>
        <h1 className="text-green-700 text-base">
          {formatMessage({ id: 'subtotal' })}
        </h1>
        <h1 className="text-green-700 text-base">{orderAmount}</h1>
      </div>
    </motion.div>
  );
};
