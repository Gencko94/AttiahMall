import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';

export default function Location({
  data,
  handleRemoveLocation,
  deleteButtonLoading,
}) {
  const { formatMessage } = useIntl();
  const key = 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg';
  const cardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
    },
    exited: {
      opacity: 0,
      clipPath: 'polygon(0 54%, 100% 53%, 100% 53%, 0 54%)',
    },
  };
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="rounded border shadow-itemsSlider-shallow bg-body-light"
    >
      <div style={{ minHeight: '150px' }}>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${data.lat},${data.lng}&zoom=15&size=200x150&key=${key}`}
          alt="thumbnail"
        />
      </div>
      <div className="p-2">
        <div className="text-sm mb-2 font-semibold">
          <h1>{data.street}</h1>
          <h1>{data.governate}</h1>
        </div>
        <button
          onClick={() => handleRemoveLocation(data)}
          className={` ${
            deleteButtonLoading === data.lat ? 'bg-gray-300' : 'bg-main-color'
          } text-main-text rounded   px-2 py-1 text-sm w-full flex justify-center`}
        >
          {deleteButtonLoading === data.lat ? (
            <MoonLoader size={17} color="#b72b2b" />
          ) : (
            <h1>{formatMessage({ id: 'remove-location' })}</h1>
          )}
        </button>
      </div>
    </motion.div>
  );
}
