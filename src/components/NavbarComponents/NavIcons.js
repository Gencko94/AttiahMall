import React from 'react';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { MoonLoader } from 'react-spinners';
export default function NavIcons({ color = 'nav-secondary' }) {
  const { getCartAndWishListLength, isLightTheme } = React.useContext(
    DataProvider
  );
  const { formatMessage, locale } = useIntl();
  const { data, isLoading } = useQuery(
    'cartAndWishListLength',
    async () => {
      return await getCartAndWishListLength();
    },
    { refetchOnWindowFocus: false }
  );
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
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center ${
            isLightTheme
              ? 'bg-second-nav-text-light text-second-nav-light'
              : 'bg-second-nav-dark text-second-nav-text-dark '
          }`}
        >
          {isLoading && <MoonLoader size={11} color="#b72b2b" />}
          {!isLoading && data.cart}
        </span>
      </Link>
      <Link
        to={`/${locale}/wishlist`}
        className="flex p-1  items-center font-semibold   relative"
      >
        <h1 className=" text-sm ">{formatMessage({ id: 'nav.wishlist' })}</h1>
        <AiOutlineHeart className="w-30p h-30p mx-1 " />
        <span
          className={`absolute ${
            locale === 'ar' ? 'rtl-cart-icon' : 'right-0'
          } h-4 w-4  font-bold rounded-full  top-0 text-xs flex items-center justify-center ${
            isLightTheme
              ? 'bg-second-nav-text-light text-second-nav-light'
              : 'bg-second-nav-dark text-second-nav-text-dark '
          }`}
        >
          {isLoading && <MoonLoader size={11} color="#b72b2b" />}
          {!isLoading && data.wishlist}
        </span>
      </Link>

      {/* <Link
        to={`/${locale}/wishlist`}
        className="p-1 flex items-center font-semibold  "
      >
        <h1 className=" text-sm ">{formatMessage({ id: 'nav.wishlist' })}</h1>
        <AiOutlineHeart className="w-30p h-30p mx-1" />
      </Link> */}
    </div>
  );
}
