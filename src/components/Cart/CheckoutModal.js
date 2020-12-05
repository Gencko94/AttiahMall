import React from 'react';
import { GrClose } from 'react-icons/gr';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';
export default function CheckoutModal({ setCheckOutModalOpen }) {
  const { formatMessage, locale } = useIntl();
  const history = useHistory();

  const containerVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exited: {
      y: 50,
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="fixed top-0 left-0 right-0 bottom-0 z-30 flex items-center justify-center"
    >
      <div
        className={`rounded-lg  
             
                bg-body-light text-body-text-light
             w-11/12 md:max-w-xl z-2 `}
      >
        <div className=" px-4 py-3  text-lg font-semibold flex items-center justify-between">
          <h1>{formatMessage({ id: 'checkout' })}</h1>
          <button onClick={() => setCheckOutModalOpen(false)}>
            <GrClose />
          </button>
        </div>
        <hr />
        <h1 className="px-4 pt-2  font-semibold">
          {formatMessage({ id: 'not-signed-in' })} ,
          {formatMessage({ id: 'you-can' })} :
        </h1>
        <div className="flex items-center  px-4 py-3 text-white">
          <div className="flex-1">
            <button
              onClick={() => history.push(`/${locale}/checkout/guest-checkout`)}
              className="p-2  bg-green-600 rounded w-full text-center uppercase"
            >
              {formatMessage({ id: 'guest-checkout' })}
            </button>
          </div>
          <div className="flex-1 mx-2">
            <button
              onClick={() => history.push(`/${locale}/app/login`)}
              className="p-2   text-center bg-blue-700 rounded w-full uppercase"
            >
              {formatMessage({ id: 'login' })}
            </button>
          </div>
        </div>
        <hr />
        <div className="p-4 text-sm">
          <p>{formatMessage({ id: 'checkout-modal-tos' })}</p>
        </div>
      </div>

      <div
        onClick={() => setCheckOutModalOpen(false)}
        className="z-1 absolute top-0 left-0 h-full w-full modal-bg"
      />
    </motion.div>
  );
}
