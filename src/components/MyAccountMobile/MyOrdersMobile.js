import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import NoOrdersMobile from './MyOrdersMobile/NoOrdersMobile';
import OrderMobile from './MyOrdersMobile/OrderMobile';
import OrderDetailsMobile from './MyOrdersMobile/OrderDetailsMobile';
import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';
export default function MyOrdersMobile() {
  const { getOrderedItems, isLightTheme } = React.useContext(DataProvider);
  const [orderDetailsOpen, setOrderDetailsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery('orders', async () => {
    const res = await getOrderedItems();

    return res;
  });
  const handleOrderDetailsClose = React.useCallback(() => {
    setSelectedOrder(null);
  }, []);
  React.useEffect(() => {
    if (selectedOrder) {
      setOrderDetailsOpen(true);
    } else {
      setOrderDetailsOpen(false);
    }
  }, [selectedOrder]);
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

  if (isLoading)
    return (
      <div
        className="flex  justify-center items-center"
        style={{ minHeight: 'calc(-120px + 100vh)' }}
      >
        <BeatLoader size={10} color={'#b72b2b'} />
      </div>
    );
  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=""
        style={{ minHeight: 'calc(-120px + 100vh)' }}
      >
        {data.length === 0 ? (
          <NoOrdersMobile />
        ) : (
          <div className="p-3 my-orders-items__grid-mobile">
            {data.map(order => {
              return (
                <div key={order.orderNo}>
                  <OrderMobile
                    isLightTheme={isLightTheme}
                    order={order}
                    setSelectedOrder={setSelectedOrder}
                  />
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {orderDetailsOpen && (
          <OrderDetailsMobile
            selectedOrder={selectedOrder}
            handleOrderDetailsClose={handleOrderDetailsClose}
            orderDetailsOpen={orderDetailsOpen}
            isLightTheme={isLightTheme}
          />
        )}
      </AnimatePresence>
    </>
  );
}
