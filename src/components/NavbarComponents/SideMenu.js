import React from 'react';

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineApartment } from 'react-icons/ai';
import { AiOutlineHistory } from 'react-icons/ai';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { CgProfile } from 'react-icons/cg';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlinePoweroff } from 'react-icons/ai';

import { MdAccountCircle, MdLocationOn } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import { RiCustomerServiceFill } from 'react-icons/ri';
import { DataProvider } from '../../contexts/DataContext';
import { AuthProvider } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import TopSection from '../SideMenuMobile/TopSection';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import SideMenuCategories from '../SideMenu/SideMenuCategories';
import SideMenuLanguages from '../SideMenu/SideMenuLanguages';
import SideMenuDeliveryCountries from '../SideMenu/SideMenuDeliveryCountries';
import SideMenuCustomerService from '../SideMenu/SideMenuCustomerService';
export default function SideMenu({ toggleSideMenu, sideMenuRef }) {
  const { isAuthenticated, userLogoutMutation } = React.useContext(
    AuthProvider
  );
  const {
    categories,
    categoriesLoading,
    deliveryCountry,
    deliveryCountries,
    deliveryCountriesLoading,
    setDeliveryCountry,
  } = React.useContext(DataProvider);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showLanguages, setShowLanguages] = React.useState(false);
  const [showDeliveryCountries, setShowDeliveryCountries] = React.useState(
    false
  );
  const [showCustomerService, setShowCustomerService] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [subCategory, setSubCategory] = React.useState(0);
  const [secondSubPage, setSecondSubPage] = React.useState(0);
  const innerRef = React.useRef(null);
  const { locale, formatMessage } = useIntl();

  const handleClickBackFirst = () => {
    setPage(page - 1);
    setTimeout(() => {
      setShowCategories(false);
    }, 400);
  };
  const handleClickBackSecond = i => {
    setPage(page - 1);
    setSecondSubPage(i);
  };
  const handleClickNextZero = () => {
    if (categoriesLoading) {
      return;
    }
    setPage(page + 1);
    setShowCategories(true);
  };
  const handleShowLanguages = () => {
    setPage(page + 1);
    setShowLanguages(true);
  };
  const handleHideLanguages = () => {
    setPage(page - 1);
    setTimeout(() => {
      setShowLanguages(false);
    }, 400);
  };
  const handleShowDeliveryCountries = () => {
    if (deliveryCountriesLoading) {
      return;
    }
    setPage(page + 1);
    setShowDeliveryCountries(true);
  };
  const handleHideDeliveryCountries = () => {
    setPage(page - 1);
    setTimeout(() => {
      setShowDeliveryCountries(false);
    }, 400);
  };
  const handleShowCustomerService = () => {
    setPage(page + 1);
    setShowCustomerService(true);
  };
  const handleHideCustomerService = () => {
    setPage(page - 1);
    setTimeout(() => {
      setShowCustomerService(false);
    }, 400);
  };
  const handleClickNextFirst = i => {
    setPage(page + 1);
    setSubCategory(i);
  };
  const handleClickNextSecond = i => {
    setPage(page + 1);
    setSecondSubPage(i);
  };

  React.useEffect(() => {
    if (innerRef.current) {
      innerRef.current.classList.remove(`${locale}-page${page + 1}`);
      innerRef.current.classList.remove(`${locale}-page${page}`);
      innerRef.current.classList.remove(`${locale}-page${page - 1}`);
      innerRef.current.classList.add(`${locale}-page${page}`);
    }
  }, [page, locale]);
  const x = React.useMemo(() => {
    let x;
    if (locale === 'ar') {
      x = '100%';
    } else {
      x = '-100%';
    }
    return x;
  }, [locale]);
  const containerVariants = {
    from: {
      x: x,
    },
    to: {
      x: '0%',
      transition: {
        duration: 0.2,
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: -0.1,
      },
    },
    exited: {
      x: x,
      transition: {
        type: 'tween',
      },
    },
  };

  const childVariants = {
    from: {
      opacity: 0,
      y: 50,
    },
    to: {
      opacity: 1,
      y: 0,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="from"
      animate="to"
      exit="exited"
      ref={sideMenuRef}
      className={`
        
         bg-side-light text-side-light-text
         
        z-30  fixed top-0 ${
          locale === 'ar' ? 'right-0' : 'left-0'
        } min-w-75p h-screen sm:text-lg`}
      style={{ maxWidth: '75%' }}
    >
      <TopSection toggleSideMenu={toggleSideMenu} />

      <div className="relative overflow-hidden mt-2 ">
        <div ref={innerRef} className="sidebar__inner  ">
          <div className="sidebar-first__page ">
            <motion.button
              key="allCategories"
              variants={childVariants}
              onClick={handleClickNextZero}
              className="py-2 px-2 mb-2 flex items-center justify-between "
            >
              <div className="flex items-center">
                <AiOutlineApartment className=" w-25p h-25p" />
                <h1 className="mx-2">
                  {formatMessage({ id: 'all-categories' })}
                </h1>
              </div>
              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </motion.button>
            <motion.button
              key="cart"
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2   "
              variants={childVariants}
            >
              <Link to={`/${locale}/cart`} className="flex items-center">
                <HiOutlineShoppingBag className=" w-25p h-25p" />
                <h1 className="mx-2">{formatMessage({ id: 'cart' })}</h1>
              </Link>
            </motion.button>
            {!isAuthenticated && (
              <motion.button
                key="login"
                onClick={toggleSideMenu}
                className="py-2 px-2 mb-2 "
                variants={childVariants}
              >
                <Link to={`/${locale}/app/login`} className="flex items-center">
                  <MdAccountCircle className="w-25p h-25p " />
                  <h1 className="mx-2">
                    {formatMessage({ id: 'short-login' })}
                  </h1>
                </Link>
              </motion.button>
            )}
            {isAuthenticated && (
              <motion.button
                key="profile"
                className="py-2 px-2 mb-2"
                onClick={toggleSideMenu}
                variants={childVariants}
              >
                <Link
                  to={`/${locale}/user/account`}
                  className="flex items-center"
                >
                  <CgProfile className=" w-25p h-25p" />
                  <h1 className="mx-2">
                    {formatMessage({ id: 'my-account' })}
                  </h1>
                </Link>
              </motion.button>
            )}
            <motion.button
              key="orderHistory"
              variants={childVariants}
              onClick={toggleSideMenu}
              className="py-2 px-2 mb-2  "
            >
              <div className=" flex items-center">
                <AiOutlineHistory className=" w-25p h-25p" />
                <h1 className="mx-2">
                  {formatMessage({ id: 'order-history' })}
                </h1>
              </div>
            </motion.button>
            <hr />
            {isAuthenticated && (
              <motion.button
                key="wishlist"
                variants={childVariants}
                onClick={toggleSideMenu}
                className="py-2 px-2 mb-2  "
              >
                <Link to={`/${locale}/wishlist`} className="flex items-center">
                  <AiOutlineHeart className=" w-25p h-25p" />
                  <h1 className="mx-2">{formatMessage({ id: 'wishlist' })}</h1>
                </Link>
              </motion.button>
            )}
            {isAuthenticated && (
              <motion.button
                key="viewedItems"
                variants={childVariants}
                onClick={toggleSideMenu}
                className="py-2 px-2 mb-2    "
              >
                <Link
                  to={`/${locale}/vieweditems`}
                  className="flex items-center"
                >
                  <AiOutlineEye className=" w-25p h-25p" />
                  <h1 className="mx-2 whitespace-no-wrap">
                    {formatMessage({ id: 'viewed-items' })}
                  </h1>
                </Link>
              </motion.button>
            )}
            <hr />
            <motion.button
              key="deliverTo"
              variants={childVariants}
              onClick={handleShowDeliveryCountries}
              className="p-2 mb-2"
            >
              <div className=" flex items-center justify-between">
                <div className="flex items-center">
                  <MdLocationOn className=" w-25p h-25p" />
                  <h1 className="mx-2">
                    {formatMessage({ id: 'deliver-to' })} :{' '}
                    {deliveryCountry?.translation[locale].name}
                  </h1>
                </div>
                {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
              </div>
            </motion.button>
            <motion.button
              key="customerService"
              variants={childVariants}
              onClick={handleShowCustomerService}
              className="p-2 mb-2"
            >
              <div className=" flex items-center justify-between">
                <div className="flex items-center">
                  <RiCustomerServiceFill className=" w-25p h-25p" />
                  <h1 className="mx-2">
                    {formatMessage({ id: 'customer-service' })}
                  </h1>
                </div>
                {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
              </div>
            </motion.button>
            <hr />
            <motion.button
              key="language"
              variants={childVariants}
              onClick={handleShowLanguages}
              className="py-2 px-2 mb-2 flex items-center justify-between "
            >
              <div className=" flex items-center">
                <FaLanguage className=" w-25p h-25p" />
                <h1 className="mx-2">{formatMessage({ id: 'language' })}</h1>
              </div>
              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </motion.button>
            {isAuthenticated && (
              <motion.button
                key="logout"
                variants={childVariants}
                onClick={() => {
                  toggleSideMenu();
                  userLogoutMutation();
                }}
                className="py-2 px-2 mb-2"
              >
                <div className=" flex items-center">
                  <AiOutlinePoweroff className=" w-25p h-25p" />
                  <h1 className="mx-2">{formatMessage({ id: 'logout' })}</h1>
                </div>
              </motion.button>
            )}
          </div>
          {showCategories && (
            <SideMenuCategories
              handleClickBackFirst={handleClickBackFirst}
              handleClickBackSecond={handleClickBackSecond}
              handleClickNextFirst={handleClickNextFirst}
              handleClickNextSecond={handleClickNextSecond}
              secondSubPage={secondSubPage}
              subCategory={subCategory}
              categories={categories}
            />
          )}
          {showLanguages && (
            <SideMenuLanguages handleHideLanguages={handleHideLanguages} />
          )}
          {showDeliveryCountries && (
            <SideMenuDeliveryCountries
              handleHideDeliveryCountries={handleHideDeliveryCountries}
              deliveryCountries={deliveryCountries}
              deliveryCountry={deliveryCountry}
              setDeliveryCountry={setDeliveryCountry}
            />
          )}
          {showCustomerService && (
            <SideMenuCustomerService
              handleHideCustomerService={handleHideCustomerService}
              deliveryCountries={deliveryCountries}
              deliveryCountry={deliveryCountry}
              setDeliveryCountry={setDeliveryCountry}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
