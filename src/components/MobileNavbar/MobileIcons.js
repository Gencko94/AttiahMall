import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import DeliverTo from './DeliverTo';
import LanguageMobile from './LanguageMobile';

export default function MobileIcons({
  withoutLanguage = false,
  withoutFlag = false,
}) {
  const { cartItems, isLightTheme } = React.useContext(DataProvider);
  const { locale } = useIntl();
  return (
    <div className="flex text-nav-secondary items-center">
      {!withoutFlag && <DeliverTo />}
      <Link to={`/${locale}/cart`} className="p-1 flex mx-1  relative">
        <HiOutlineShoppingBag className="w-25p h-25p" />
        <span
          className={`${
            locale === 'ar' ? 'rtl-cart-icon ' : 'right-0'
          } h-4 w-4 text-nav-secondary font-bold rounded-full absolute top-0 text-xs flex items-center justify-center ${
            isLightTheme
              ? 'bg-second-nav-text-light text-second-nav-light'
              : 'bg-second-nav-dark text-second-nav-text-dark'
          }`}
        >
          {cartItems.length}
        </span>
      </Link>
      {!withoutLanguage && <LanguageMobile />}
    </div>
  );
}
