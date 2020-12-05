import React from 'react';
import Slider from 'react-slick';
import { BsChevronRight } from 'react-icons/bs';
import { BsChevronLeft } from 'react-icons/bs';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../../contexts/DataContext';
import SliderItem from './SliderItem';
import { queryCache, useMutation, useQuery } from 'react-query';
import { addToCart, removeFromCart } from '../../../Queries/Queries';
import { AuthProvider } from '../../../contexts/AuthContext';
// import { getItemsByType } from '../../../Queries/Queries';

const RightArrow = ({ onClick }) => {
  return (
    <div
      className="hover:bg-gray-300 rounded-full grid place-items-center absolute top-1/2 right-n25 lg:right-n42 w-8 h-8 lg:h-12 lg:w-12 z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronRight />
    </div>
  );
};
const LeftArrow = ({ onClick }) => {
  return (
    <div
      className="hover:bg-gray-300 rounded-full flex justify-center w-8 h-8  lg:h-12 lg:w-12    items-center absolute left-8 top-1/2   z-1 transform -translate-x-1/2 -translate-y-1/2 bg-white transition-colors duration-150 shadow-2xl border border-gray-300"
      onClick={onClick}
    >
      <BsChevronLeft />
    </div>
  );
};

export default function ItemsSlider({ data, title }) {
  const settings = {
    className: '',
    arrows: true,
    infinite: true,
    slidesToShow: 6,
    lazyLoad: true,
    slidesToScroll: 4,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    // adaptiveHeight: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const {
    removeItemFromCart,
    addItemToCart,
    getItemsByType,
  } = React.useContext(DataProvider);

  const { formatMessage, locale } = useIntl();
  const [size, setSize] = React.useState('xs');
  const [quantity, setQuantity] = React.useState(1);
  const [activeBuyOptions, setActiveBuyOptions] = React.useState(null);
  const { userId } = React.useContext(AuthProvider);
  const [loadingButton, setLoadingButton] = React.useState(null);
  const handleBuyOptionsToggle = id => {
    if (activeBuyOptions === id) {
      setActiveBuyOptions(null);
      setQuantity(1);
      setSize('xs');
      return;
    }
    setActiveBuyOptions(id);
    setSize('xs');
    setQuantity(1);
  };
  const [cartItems, setCartItems] = React.useState([]);

  const handleAddToCart = async id => {
    setLoadingButton(id);
    try {
      const res = await addToCart(
        {
          id,
          quantity,
        },
        userId
      );
      setCartItems(prev => {
        return prev.push(id);
      });
    } catch (error) {
      setLoadingButton(null);
      console.error(error.response);
    }
  };
  const handleRemoveFromCart = async id => {
    setLoadingButton(id);
    try {
      const res = await removeFromCart(id, userId);
      setCartItems(prev => {
        return prev.filter(i => i !== id);
      });
    } catch (error) {
      setLoadingButton(null);
      console.error(error.response);
    }
  };
  return (
    <div className="my-6 overflow-hidden   ">
      <div className="flex items-center mb-4">
        <h1 className="text-xl font-bold flex-1 ">{title}</h1>
        <button className="py-1 px-2  bg-second-nav-light text-second-nav-text-light rounded whitespace-no-wrap">
          {formatMessage({ id: 'seeAll' })}
        </button>
      </div>
      <Slider className="" {...settings}>
        {/* {isLoading &&
          [0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} className="px-2 my-4">
              <ContentLoader
                speed={2}
                viewBox="0 0 400 560"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                key={i}
                rtl={locale === 'ar'}
              >
                <rect x="0" y="0" rx="5" ry="5" width="100%" height="370" />
                <rect x="0" y="400" rx="5" ry="5" width="100%" height="30" />
                <rect x="0" y="450" rx="5" ry="5" width="50%" height="30" />
                <rect x="0" y="500" rx="5" ry="5" width="100%" height="50" />
              </ContentLoader>
            </div>
          ))} */}
        {data.map(item => {
          return (
            <SliderItem
              key={item.id}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              loadingButton={loadingButton}
              cartItems={cartItems}
              item={item}
              activeBuyOptions={activeBuyOptions}
              setQuantity={setQuantity}
              handleBuyOptionsToggle={handleBuyOptionsToggle}
              options={{ size, quantity }}
              setSize={setSize}
            />
          );
        })}
      </Slider>
    </div>
  );
}
