import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
// import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper-bundle.css';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
SwiperCore.use([Navigation]);
export default function Categories() {
  const { categories, categoriesLoading } = React.useContext(DataProvider);
  // const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { locale } = useIntl();
  // const isMobile = useMediaQuery({ query: '(min-width: 360px)' });

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
    <div className="my-3 text-body-text-light px-2">
      <Swiper navigation id="main" spaceBetween={10} breakpoints={breakpoints}>
        {categoriesLoading &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return (
              <SwiperSlide key={i} className="overflow-hidden ">
                <ContentLoader
                  speed={2}
                  viewBox="0 0 400 500"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="50%" cy="50%" r="200" width="100%" />
                </ContentLoader>
              </SwiperSlide>
            );
          })}
        {categories &&
          categories.map(item => {
            return (
              <SwiperSlide key={item.id} className="rounded-full">
                <div className="  overflow-hidden  relative ">
                  <a href={`/${locale}/categories/${item.slug}`}>
                    <img
                      src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image.link}`}
                      alt="something"
                      className=" h-auto w-full "
                    />
                  </a>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}
