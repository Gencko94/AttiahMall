import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import cartEmptyimg from '../../assets/illustrations/cartEmpty.png';
import { AnimatePresence, motion } from 'framer-motion';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import { AuthProvider } from '../../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function SideCartMenu({ setSideMenuOpen }) {
  const { cartItems, cartTotal } = React.useContext(CartAndWishlistProvider);
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
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
      opacity: 0,
    },
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        type: 'tween',
        staggerChildren: 0.1,
      },
    },
    exited: {
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
      transition: {
        when: 'afterChildren',
      },
    },
  };
  const cartItemVariant = {
    hidden: {
      x: `${locale === 'ar' ? '-100%' : '100%'}`,
    },
    visible: {
      x: '0',
      delay: 3,
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
      className={`side-add-to-cart__container ${
        locale === 'ar' ? 'left-0' : 'right-0'
      }`}
    >
      <div className=" bg-body-light p-2 h-full flex flex-col ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">
            {formatMessage({ id: 'shopping-cart' })}
          </h1>
          <button onClick={() => setSideMenuOpen(false)}>
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
                    key={item.id}
                    initial="hidden"
                    animate="visible"
                    exit="exited"
                    variants={cartItemVariant}
                    className=" side-cart-menu__item mb-2"
                  >
                    <div className="">
                      <Link
                        title={`${item[`name_${locale}`]}`}
                        className="hover:underline"
                        to={`/${locale}/c/${item.id}`}
                      >
                        <img
                          src={`${process.env.REACT_APP_IMAGES_URL}/medium/${item.image}`}
                          alt={`${item[`name_${locale}`]}`}
                          className="max-w-full h-auto"
                        />
                      </Link>
                    </div>
                    <div className="">
                      <Link
                        title={`${item[`name_${locale}`]}`}
                        className="hover:underline"
                        to={`/${locale}/c/${item.id}`}
                      >
                        <h1 className="text-clamp-2 text-sm font-semibold">
                          {`${item[`name_${locale}`]}`}
                        </h1>
                      </Link>
                      <div className="flex items-center">
                        <h1 className="text-xs rounded p-1 font-bold  bg-gray-200 inline">
                          {item.price * item.qty} SAR
                        </h1>
                        <h1 className="mx-1 text-sm">
                          {formatMessage({ id: 'quantity' })} : {item.qty}
                        </h1>
                      </div>
                      <div>
                        <button
                          className={`${
                            removeFromCartButtonLoading === item.id
                              ? 'bg-gray-300'
                              : 'bg-main-color text-main-text'
                          } text-xs rounded p-1 my-1 uppercase`}
                          onClick={() => {
                            handleRemoveFromCart(item.id, item.cart_id);
                          }}
                        >
                          {removeFromCartButtonLoading === item.id ? (
                            <Loader
                              type="ThreeDots"
                              color="#b72b2b"
                              height={21}
                              width={21}
                              visible={true}
                            />
                          ) : (
                            formatMessage({ id: 'remove-from-cart' })
                          )}
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
                to={`/${locale}/checkout/guest-checkout`}
                className={`flex-1 py-2  px-3  bg-green-700 w-full  rounded `}
              >
                {formatMessage({ id: 'checkout' })}
              </Link>
              <Link
                to={`/${locale}/cart`}
                className={`flex-1 py-2 px-3 border border-main-color text-main-color mx-1    rounded`}
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
