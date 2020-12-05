import { motion } from 'framer-motion';
import React from 'react';
import { MdPayment } from 'react-icons/md';
import { useIntl } from 'react-intl';
import lostManWallet from '../../assets/illustrations/lostManWallet.svg';
import { DataProvider } from '../../contexts/DataContext';

export default function PaymentDetails() {
  const { isLightTheme } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
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
      <div className="flex flex-col justify-center items-center h-full">
        <img
          src={lostManWallet}
          alt="map"
          className="mb-6"
          style={{ height: '200px' }}
        />
        <div className="flex flex-col items-center ">
          <h1 className="text-lg text-center font-semibold">
            {formatMessage({ id: 'no-payment-method' })}
          </h1>
          <button
            className={` mt-3  font-semibold flex items-center rounded px-4 py-2  ${
              isLightTheme
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-btn-primary-dark text-btn-secondary-dark'
            } `}
          >
            <h1 className="mx-2">
              {formatMessage({ id: 'add-payment-method' })}
            </h1>
            <MdPayment className="w-20p h-20p" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
