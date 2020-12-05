import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';

export default function SideCartMenuMobile({
  cartItems,
  handleRemoveFromCart,
  setSideMenuOpen,
  cartTotal,
}) {
  const handleCloseMenu = () => {
    setSideMenuOpen(false);
  };
  const { formatMessage, locale } = useIntl();

  const sideMenuVariants = {
    hidden: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
      opacity: 0,
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
      transition: {
        when: 'afterChildren',
        type: 'tween',
      },
    },
  };
  const cartItemVariant = {
    hidden: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
    },
    visible: {
      x: 0,
    },
    exited: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={sideMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className={`side-add-to-cart__container-mobile ${
        locale === 'ar' ? 'right-0' : 'left-0'
      } `}
    >
      <div className=" bg-body-light p-2 h-full flex flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">
            {formatMessage({ id: 'shopping-cart' })}
          </h1>
          <button onClick={handleCloseMenu}>
            <MdClose className="w-5 h-5 " />
          </button>
        </div>
        <hr className="my-2" />
        {cartItems.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <img src={cartEmptyimg} alt="Empty cart" />
            <h1 className="font-bold mb-2">
              {formatMessage({ id: 'cart-empty' })}
            </h1>
            <Link
              to={`/${locale}`}
              className="text-sm text-blue-600 hover:underline"
            >
              {formatMessage({ id: 'check-today-deals' })}
            </Link>
          </div>
        )}
        {cartItems.length !== 0 && (
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden"
            style={{ maxHeight: 'calc(-110px + 100vh)' }}
          >
            <AnimatePresence>
              {cartItems.map(item => {
                return (
                  <motion.div
                    variants={cartItemVariant}
                    key={item.id}
                    initial="hidden"
                    animate="visible"
                    exit="exited"
                    className=" after__addToCart-related mb-2"
                  >
                    <div className="">
                      <Link
                        title={item.name}
                        className="hover:underline"
                        to={`/${locale}/${item.category.replace(
                          /\s|%|,/g,
                          '-'
                        )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
                      >
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="max-w-full h-auto"
                        />
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        title={item.name}
                        className="hover:underline"
                        to={`/${locale}/${item.category.replace(
                          /\s|%|,/g,
                          '-'
                        )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
                      >
                        <MultiClamp
                          className="font-semibold text-sm "
                          clamp={4}
                          ellipsis="..."
                        >
                          {item.name}
                        </MultiClamp>
                      </Link>

                      <h1 className="text-xs rounded p-1 font-bold  bg-gray-200 inline">
                        {item.price} SAR
                      </h1>
                      <div>
                        <button
                          className="bg-main-color text-main-text text-xs rounded p-1 my-1"
                          onClick={() => {
                            handleRemoveFromCart(item.id);
                          }}
                        >
                          {formatMessage({ id: 'remove-from-cart' })}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
        <hr className="my-1" />
        {cartItems.length !== 0 && (
          <div>
            <div className="flex justify-between semibold items-center  my-2">
              <h1 className="">{formatMessage({ id: 'subtotal' })}</h1>
              <h1 className=" font-semibold">{cartTotal} SAR</h1>
            </div>
            <hr className="my-1" />
            <div className=" flex items-center my-2 text-center text-second-nav-text-light ">
              <Link
                to={`/${locale}/checkout/guestcheckout`}
                className={`flex-1 py-2  px-3  bg-green-700 w-full  rounded `}
              >
                {formatMessage({ id: 'checkout' })}
              </Link>
              <Link
                to={`/${locale}/cart`}
                className={`flex-1 py-2 px-3 text-main-color mx-1 border-main-color border   rounded`}
              >
                {formatMessage({ id: 'go-to-cart' })}
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
