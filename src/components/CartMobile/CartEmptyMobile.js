import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { AuthProvider } from '../../contexts/AuthContext';
export default function CartEmptyMobile() {
  const { userId } = React.useContext(AuthProvider);
  const { formatMessage, locale } = useIntl();
  const { variants } = {
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
    >
      <div className="p-2">
        <div
          className="flex items-center justify-center"
          style={{ minHeight: '23em' }}
        >
          <img src={cartEmptyimg} alt="Empty Cart Bag" className="h-auto" />
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
      {!userId && (
        <div className="flex flex-col justify-center p-2">
          <Link
            to={`/${locale}/app/login`}
            className={`  text-center rounded p-2 uppercase bg-green-700 text-second-nav-text-light `}
          >
            {formatMessage({ id: 'login' })}
          </Link>
          <Link
            to={`/${locale}/app/register`}
            className={` text-center  rounded p-2 uppercase bg-blue-700 text-second-nav-text-light mt-2 `}
          >
            {formatMessage({ id: 'register' })}
          </Link>
        </div>
      )}
    </motion.div>
  );
}
