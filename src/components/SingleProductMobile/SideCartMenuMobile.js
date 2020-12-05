import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { MdClose } from 'react-icons/md';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';

import SideCartMenuItemMobile from './SideCartMenuItemMobile';
export default function SideCartMenuMobile({ setSideMenuOpen }) {
  const { cartItems, cartTotal } = React.useContext(CartAndWishlistProvider);
  const handleCloseMenu = () => {
    setSideMenuOpen(false);
  };
  const { formatMessage, locale } = useIntl();
  const [
    removeFromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(null);
  const { removeFromCartMutation } = React.useContext(CartAndWishlistProvider);
  const { userId } = React.useContext(AuthProvider);
  const handleRemoveFromCart = async (id, cart_id) => {
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, cart_id, userId });
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
      console.log(error.response);
    }
  };
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
                  <SideCartMenuItemMobile
                    key={item.id}
                    item={item}
                    handleRemoveFromCart={handleRemoveFromCart}
                    removeFromCartButtonLoading={removeFromCartButtonLoading}
                  />
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
              <h1 className=" font-semibold">{cartTotal} KD</h1>
            </div>
            <hr className="my-1" />
            <div className=" flex items-center my-2 text-center text-second-nav-text-light ">
              <Link
                to={`/${locale}/checkout/guest-checkout`}
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
