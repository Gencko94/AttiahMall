import React from 'react';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';

import { AuthProvider } from '../../contexts/AuthContext';
import { getStaticSwiperData } from '../../Queries/Queries';
import { useQuery } from 'react-query';
import SwiperLoader from '../Home/SwiperLoader';
import { CartAndWishlistProvider } from '../../contexts/CartAndWishlistContext';
import SwiperItem from './SwiperItem';
SwiperCore.use([Navigation]);
export default function StaticSwiper({ type, setCartMenuOpen }) {
  const { formatMessage } = useIntl();

  const { addToCartMutation, removeFromCartMutation } = React.useContext(
    CartAndWishlistProvider
  );
  const { userId } = React.useContext(AuthProvider);
  const [loadingButton, setLoadingButton] = React.useState(null);

  const { data, isLoading } = useQuery(
    ['staticSwiper', type],
    getStaticSwiperData,
    { retry: true }
  );
  const [cartItems, setCartItems] = React.useState([]);

  const handleAddToCart = async newItem => {
    setLoadingButton(newItem.id);
    // const newItem = { id:newItem.id, quantity: quantity, size };
    try {
      await addToCartMutation({ newItem, userId });
      setCartMenuOpen(true);
      setCartItems(prev => {
        return [...prev, newItem.id];
      });
      setLoadingButton(null);
    } catch (error) {
      setLoadingButton(null);
      console.error(error.response);
    }
  };
  const handleRemoveFromCart = async id => {
    setLoadingButton(id);
    try {
      await removeFromCartMutation({ id, userId });
      setCartItems(prev => {
        return prev.filter(i => i !== id);
      });
    } catch (error) {
      setLoadingButton(null);
      console.error(error.response);
    }
  };
  const breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    // when window width is >= 640px
    640: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
    860: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
    1100: {
      slidesPerView: 7,
      spaceBetween: 20,
    },
    1440: {
      slidesPerView: 8,
      spaceBetween: 20,
    },
  };
  return (
    <div className="my-8">
      {isLoading && <div className="mb-4 " style={{ height: '30px' }}></div>}
      {!isLoading && (
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold flex-1 ">{type}</h1>
          <button className="py-1 px-2  bg-main-color text-second-nav-text-light rounded whitespace-no-wrap">
            {formatMessage({ id: 'seeAll' })}
          </button>
        </div>
      )}
      {isLoading && <SwiperLoader />}
      {!isLoading && (
        <Swiper
          navigation
          id="main"
          spaceBetween={10}
          breakpoints={breakpoints}
        >
          {data.map(item => {
            return (
              <SwiperSlide
                key={item.id}
                className={`overflow-hidden slider-item border  relative my-1
             shadow
            rounded`}
              >
                <SwiperItem
                  item={item}
                  handleAddToCart={handleAddToCart}
                  handleRemoveFromCart={handleRemoveFromCart}
                  cartItems={cartItems}
                  loadingButton={loadingButton}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}
