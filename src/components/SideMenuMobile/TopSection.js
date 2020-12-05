import React from 'react';
import { Link } from 'react-router-dom';
import NavLogoMobile from '../MobileNavbar/NavLogoMobile';
import Hamburger from '../MobileNavbar/Hamburger';
import { AiFillHome } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { BsBagFill } from 'react-icons/bs';
import { useIntl } from 'react-intl';
import { motion } from 'framer-motion';

export default function TopSection({ isLightTheme, toggleSideMenu }) {
  const { locale, formatMessage } = useIntl();
  const listContainerVariants = {
    hidden: {
      y: -20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
      },
    },
  };
  return (
    <div
      className={`${
        isLightTheme
          ? 'bg-second-nav-light text-second-nav-text-light'
          : 'bg-second-nav-dark text-second-nav-text-dark'
      } p-1`}
    >
      <div className={`p-1 flex items-center `}>
        <Hamburger toggleSideMenu={toggleSideMenu} />
        <div className=" flex-1 justify-center ">
          <NavLogoMobile />
        </div>
      </div>
      <div className="  px-1 my-2 ">
        <motion.div
          className="flex justify-between items-center"
          variants={listContainerVariants}
          animate="visible"
          initial="hidden"
        >
          <motion.button className="  ">
            <Link
              to={`/${locale}`}
              style={{ width: '60px' }}
              className="flex flex-col justify-center items-center"
            >
              <div className="rounded shadow p-2 mb-1">
                <AiFillHome className="w-5 h-5 " />
              </div>
              <h1 className="text-xs  font-semibold whitespace-no-wrap">
                {formatMessage({ id: 'home' })}
              </h1>
            </Link>
          </motion.button>
          <motion.button className="">
            <Link
              style={{ width: '60px' }}
              to={`/${locale}/cart`}
              className="flex flex-col justify-center items-center"
            >
              <div className="mb-1 p-2 rounded shadow">
                <BsBagFill className="w-5 h-5" />
              </div>
              <h1 className="text-xs  font-semibold whitespace-no-wrap">
                {formatMessage({ id: 'cart' })}
              </h1>
            </Link>
          </motion.button>
          <motion.button className="">
            <Link
              style={{ width: '60px' }}
              to={`/${locale}/wishlist/`}
              className="flex flex-col justify-center items-center"
            >
              <div className=" rounded  shadow p-2 mb-1">
                <FaHeart className="w-5 h-5 " />
              </div>
              <h1 className="text-xs  font-semibold whitespace-no-wrap">
                {formatMessage({ id: 'wishlist-short' })}
              </h1>
            </Link>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
