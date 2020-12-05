import React from 'react';
// import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import SwiperCore, { Thumbs, Navigation, Zoom } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import LazyImage from '../../helpers/LazyImage';
SwiperCore.use([Thumbs, Navigation, Zoom]);
export default function ImageZoomMobile({ data, selectedVariation }) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState(null);
  return (
    <div className="mb-2">
      <Swiper id="main" slidesPerView={1} thumbs={{ swiper: thumbsSwiper }}>
        {data.type === 'simple' ? (
          [data.image, ...data.gallery].map(item => {
            return (
              <SwiperSlide key={item.id}>
                <LazyImage
                  pb="calc(100% * 681/500)"
                  src={`${process.env.REACT_APP_IMAGES_URL}/medium/${item.link}`}
                  alt={data.name}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <div>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/original/${data.variation_addons[selectedVariation].image.link}`}
              alt={data.name}
            />
          </div>
        )}
      </Swiper>
      <Swiper
        id="thumbs"
        onSwiper={setThumbsSwiper}
        slidesPerView={5}
        freeMode={true}
        spaceBetween={10}
        watchSlidesVisibility
        watchSlidesProgress
      >
        {data.type === 'simple' ? (
          [data.image, ...data.gallery].map(item => {
            return (
              <SwiperSlide key={item.id}>
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.link}`}
                  alt={item.id}
                  style={{ width: '50px', height: '50px' }}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <div>
            <img
              src={`${process.env.REACT_APP_IMAGES_URL}/small/${data.variation_addons[selectedVariation].image.link}`}
              alt={data.name}
            />
          </div>
        )}
      </Swiper>
    </div>
  );
}
