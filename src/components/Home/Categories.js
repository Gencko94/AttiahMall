import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import Slider from 'react-slick';
// import { useMediaQuery } from 'react-responsive';
// import MultiClamp from 'react-multi-clamp';
import ContentLoader from 'react-content-loader';
import { useQuery } from 'react-query';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
export default function Categories() {
  const { getHomePageCategories } = React.useContext(DataProvider);
  // const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { data, isLoading } = useQuery(
    'sliderCategories',
    async () => {
      return await getHomePageCategories();
    },
    { retry: true }
  );
  // const isMobile = useMediaQuery({ query: '(min-width: 360px)' });
  const settings = {
    className: '',
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 5,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="my-3 text-body-text-light px-2">
      <Slider className="" {...settings}>
        {isLoading &&
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => {
            return (
              <div key={i} className="px-1 overflow-hidden ">
                <ContentLoader
                  speed={2}
                  viewBox="0 0 400 500"
                  backgroundColor="#f3f3f3"
                  foregroundColor="#ecebeb"
                >
                  <circle cx="50%" cy="50%" r="200" width="100%" />
                </ContentLoader>
              </div>
            );
          })}
        {!isLoading &&
          data.map((item, i) => {
            return (
              <div key={i} className="px-">
                <div className="  overflow-hidden  relative ">
                  <img
                    src={item.url}
                    alt="something"
                    className=" h-auto w-full "
                  />
                </div>
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
const RightArrow = ({ onClick }) => {
  return (
    <button
      className="items-slider__next-button hover:bg-gray-300  rounded       bg-white transition duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronRight className="w-5 h-5" />
    </button>
  );
};
const LeftArrow = ({ onClick }) => {
  return (
    <button
      className=" items-slider__prev-button hover:bg-gray-300 rounded     bg-white transition-colors duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronLeft className="w-5 h-5" />
    </button>
  );
};
