import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';

export default function NavIcons({ color = 'nav-secondary' }) {
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const {
    cartItemsLoading,
    guestCartItemsLoading,
    cartItems,
    guestCartItems,
    wishlistItems,
    wishlistItemsLoading,
  } = React.useContext(CartAndWishlistProvider);
  const { formatMessage, locale } = useIntl();

  const resolveCartLength = () => {
    if (authenticationLoading || cartItemsLoading || guestCartItemsLoading) {
      return <Loader type="TailSpin" color="#b72b2b" height={12} width={12} />;
    } else if (!authenticationLoading && userId) {
      return cartItems.length;
    } else if (!authenticationLoading && !userId) {
      return guestCartItems.length;
    }
  };
  const resolveWishlist = () => {
    if (authenticationLoading || wishlistItemsLoading) {
      return (
        <span
          className={`absolute ${
            locale === 'ar' ? 'rtl-cart-icon' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
       
          bg-body-light text-main-color
         
      `}
        >
          <Loader type="TailSpin" color="#b72b2b" height={12} width={12} />
        </span>
      );
    } else if (!authenticationLoading && userId) {
      return (
        <span
          className={`absolute ${
            locale === 'ar' ? 'rtl-cart-icon' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
       
          bg-second-nav-text-light text-second-nav-light
         
      `}
        >
          {wishlistItems.length}
        </span>
      );
    } else if (!authenticationLoading && !userId) {
      return (
        <span
          className={`absolute ${
            locale === 'ar' ? 'rtl-cart-icon' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
       
          bg-second-nav-text-light text-second-nav-light
         
      `}
        >
          0
        </span>
      );
    }
  };
  return (
    <div
      className={`flex items-center justify-evenly  text-${color}`}
      style={{ flexBasis: '220px' }}
    >
      <Link
        to={`/${locale}/cart`}
        className="flex p-1  items-center font-semibold   relative"
      >
        <h1 className=" text-sm ">{formatMessage({ id: 'nav.cart' })}</h1>
        <HiOutlineShoppingBag className="w-30p h-30p mx-1 " />
        <span
          className={`absolute ${
            locale === 'ar' ? 'rtl-cart-icon' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center 
            
              bg-second-nav-text-light text-second-nav-light
              
          `}
        >
          {/* {authenticationLoading || cartItemsLoading || guestCartItemsLoading &&  (
            
          )} */}
          {resolveCartLength()}
        </span>
      </Link>
      <Link
        to={`/${locale}/wishlist`}
        className="flex p-1  items-center font-semibold   relative"
      >
        <h1 className=" text-sm ">{formatMessage({ id: 'nav.wishlist' })}</h1>
        <AiOutlineHeart className="w-30p h-30p mx-1 " />
        {resolveWishlist()}
      </Link>
    </div>
  );
}
