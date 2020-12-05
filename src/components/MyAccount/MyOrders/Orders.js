import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import Order from './Order';

export default function Orders({ data }) {
  const { formatMessage } = useIntl();
  return (
    <motion.div layout initial={false} className="h-full">
      <motion.div
        layout
        initial={false}
        className="flex p-3 items-center justify-between bg-main-color text-main-text"
      >
        <motion.h1 className="text-lg">
          {formatMessage({ id: 'my-orders' })}
        </motion.h1>
      </motion.div>
      <motion.div layout initial={false} className="grid grid-cols-1 gap-2 p-3">
        {data.map(order => {
          return <Order key={order.orderNo} order={order} />;
        })}
      </motion.div>
    </motion.div>
  );
}
