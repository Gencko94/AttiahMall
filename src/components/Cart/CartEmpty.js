import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
export default function CartEmpty() {
  const { formatMessage, locale } = useIntl();
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
      className=" flex flex-col items-center justify-center"
    >
      <div className="p-2 flex flex-col items-center justify-center ">
        <div style={{ width: '250px' }}>
          <img src={cartEmptyimg} alt="Empty Cart Bag" className="" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold  ">
            {formatMessage({ id: 'cart-empty' })}
          </h1>
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            {formatMessage({ id: 'check-today-deals' })}
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center p-2">
        <Link
          to={`/${locale}/app/login`}
          className={`  text-center rounded p-2 bg-green-700 text-second-nav-text-light `}
        >
          {formatMessage({ id: 'login' })}
        </Link>
        <Link
          to={`/${locale}/app/register`}
          className={` text-center  rounded p-2 bg-blue-700 text-second-nav-text-light mt-2 `}
        >
          {formatMessage({ id: 'register' })}
        </Link>
      </div>
    </motion.div>
  );
}
