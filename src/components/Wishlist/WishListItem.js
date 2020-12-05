import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyImage from '../../helpers/LazyImage';

export default function WishListItem({
  item,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
  addToCartButtonLoading,
  handleAddToCart,
  handleRemoveFromCart,
  cartItems,
}) {
  const { formatMessage, locale } = useIntl();
  const variant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      x: 300,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      layout
      variants={variant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="wishlist-item"
    >
      <Link to={`/${locale}/item/${item.id}}`}>
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image}`}
          alt={`${item[`name_${locale}`]}`}
          pb="calc(100% * 286/210)"
        />
        {/* <img
          className=""
          src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image}`}
          alt={`${item[`name_${locale}`]}`}
        /> */}
      </Link>
      <div className="">
        <Link to={`/${locale}/item/${item.id}}`}>
          <h1 className="font-semibold ">{`${item[`name_${locale}`]}`}</h1>
        </Link>

        <Rating
          initialRating={4.5}
          readonly
          emptySymbol={<AiOutlineStar className="text-main-color" />}
          fullSymbol={<AiFillStar className="text-main-color" />}
          className=" pt-0"
        />

        <div className="flex items-center mb-2">
          <h1 className=" font-semibold">{formatMessage({ id: 'price' })}</h1>
          <span className="mx-2">{item.price}</span>
        </div>
        <div className="flex text-sm  items-center mb-2 ">
          <button
            onClick={() => {
              handleRemoveItemFromWishList(item.id);
            }}
            className={`${
              removeFromWishListButtonLoading === item.id
                ? 'bg-gray-300  text-main-text'
                : 'border-main-color text-main-color border'
            }  text-sm uppercase flex items-center justify-center  p-2 rounded  font-semibold `}
            style={{ width: '200px' }}
          >
            {removeFromWishListButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={20}
                width={20}
                visible={true}
              />
            ) : (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-wishlist' })}
                </h1>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (cartItems.includes(item.id)) {
                handleRemoveFromCart(item.id);
              } else {
                handleAddToCart(item);
              }
            }}
            className={`${
              addToCartButtonLoading === item.id
                ? 'bg-gray-300'
                : cartItems.includes(item.id)
                ? 'bg-main-color'
                : 'bg-green-700'
            }  text-main-text   p-2 rounded flex items-center justify-center mx-2 font-semibold uppercase`}
            style={{ width: '200px' }}
          >
            {addToCartButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={20}
                width={20}
                visible={true}
              />
            ) : cartItems.includes(item.id) ? (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </>
            ) : (
              <>
                <h1 className="mx-2">{formatMessage({ id: 'add-to-cart' })}</h1>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
