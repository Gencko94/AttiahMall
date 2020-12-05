import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import DeliverTo from './DeliverTo';
import LanguageMobile from './LanguageMobile';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function MobileIcons({
  withoutLanguage = false,
  withoutFlag = false,
}) {
  const {
    cartItemsLoading,
    guestCartItemsLoading,
    cartItems,
    guestCartItems,
  } = React.useContext(CartAndWishlistProvider);
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const { locale } = useIntl();
  const resolveCartLength = () => {
    if (authenticationLoading || cartItemsLoading || guestCartItemsLoading) {
      return <Loader type="TailSpin" color="#b72b2b" height={12} width={12} />;
    } else if (!authenticationLoading && userId) {
      return cartItems.length;
    } else if (!authenticationLoading && !userId) {
      return guestCartItems.length;
    }
  };
  return (
    <div className="flex text-nav-secondary items-center">
      {!withoutFlag && <DeliverTo />}
      <Link to={`/${locale}/cart`} className="p-1 flex mx-1  relative">
        <HiOutlineShoppingBag className="w-25p h-25p" />
        <span
          className={`${
            locale === 'ar' ? 'rtl-cart-icon ' : 'right-0'
          } h-4 w-4 text-nav-secondary font-bold rounded-full absolute top-0 text-xs flex items-center justify-center 
            bg-body-light text-main-color
             `}
        >
          {resolveCartLength()}
        </span>
      </Link>
      {!withoutLanguage && <LanguageMobile />}
    </div>
  );
}
