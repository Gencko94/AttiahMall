import React from 'react';

import { useMediaQuery } from 'react-responsive';
import ContentLoader from 'react-content-loader';
import { useQuery } from 'react-query';
import { getMainCarouselItems } from '../../Queries/Queries';
import { useIntl } from 'react-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';
SwiperCore.use([Pagination]);
const MainCarousel = () => {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 668px)' });
  const { locale } = useIntl();
  const { data, isLoading } = useQuery(
    ['mainCarousel', isTabletOrAbove],
    getMainCarouselItems,
    { refetchOnWindowFocus: false, retry: true }
  );
  return (
    <div className="my-6 bg-body-light">
      <Swiper
        pagination={{ clickable: true, dynamicBullets: true }}
        id="main"
        spaceBetween={0}
      >
        {isLoading &&
          [0, 1, 2].map(i => {
            return (
              <SwiperSlide key={i} className="">
                <ContentLoader
                  speed={4}
                  viewBox={`0 0 ${isTabletOrAbove ? '1440' : '800'} ${
                    isTabletOrAbove ? '300' : '300'
                  }`}
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <rect
                    x="0"
                    y="0"
                    rx="5"
                    ry="5"
                    width="100%"
                    height={`${isTabletOrAbove ? '300' : '300'}`}
                  />
                </ContentLoader>
              </SwiperSlide>
            );
          })}
        {!isLoading &&
          data.map(item => {
            return (
              <SwiperSlide key={item.id}>
                <a href={`/categories/${item.category.slug}`} className="">
                  <LazyImage
                    src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.translation[locale].image.link}`}
                    alt="something"
                    pb={`${
                      isTabletOrAbove
                        ? 'calc(100% * 300/1440)'
                        : 'calc(100% * 300/800)'
                    }`}
                  />
                </a>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
};
export default MainCarousel;
