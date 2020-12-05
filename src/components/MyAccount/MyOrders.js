import { motion } from 'framer-motion';
import React from 'react';
import { useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';

import { DataProvider } from '../../contexts/DataContext';
import NoOrders from './MyOrders/NoOrders';
import Orders from './MyOrders/Orders';

export default function MyOrders() {
  const { getOrderedItems, isLightTheme } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery('orders', async () => {
    const res = await getOrderedItems();

    return res;
  });
  if (isLoading)
    return (
      <div className="flex h-full justify-center items-center">
        <BeatLoader size={10} color={'#b72b2b'} />
      </div>
    );
  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full"
    >
      {data.length === 0 && <NoOrders isLightTheme={isLightTheme} />}
      {data.length !== 0 && <Orders data={data} isLightTheme={isLightTheme} />}
    </motion.div>
  );
}
