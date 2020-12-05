import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import cartBag from '../../assets/illustrations/cartBag.svg';
export default function NoWishListItems() {
  const { formatMessage, locale } = useIntl();
  const history = useHistory();
  const variants = {
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
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className=" flex"
    >
      <img src={cartBag} alt="Empty Cart Bag" className=" h-32" />
      <div className="mx-5 flex flex-col  justify-center">
        <h1 className="text-2xl font-bold ">
          {formatMessage({ id: 'wishlist-empty' })}
        </h1>
        <button
          onClick={() => history.push(`/${locale}`)}
          className="rounded uppercase font-semibold p-2 mt-2 bg-green-700 text-second-nav-text-light"
        >
          {formatMessage({ id: 'start-shopping-now' })}
        </button>
      </div>
    </motion.div>
  );
}
