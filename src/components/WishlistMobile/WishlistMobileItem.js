import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
export default function WishlistMobileItem({
  item,
  removeFromWishListButtonLoading,
  handleRemoveItemFromWishList,
  handleAddToCart,
  itemInCart,
  handleRemoveItemFromCart,
  addToCartButtonLoading,
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
      className="border-b "
    >
      <div className="py-2 cart__item-mobile">
        <Link to={`/${locale}/item/${item.id}}`}>
          <img
            className=""
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image}`}
            alt={`${item[`name_${locale}`]}`}
          />
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
        </div>
      </div>
      <div className="flex justify-center text-sm  items-center my-2 ">
        <button
          onClick={() => {
            handleRemoveItemFromWishList(item.id);
          }}
          className={`${
            removeFromWishListButtonLoading === item.id
              ? 'bg-gray-300'
              : 'bg-main-color'
          }  text-main-text text-sm flex items-center justify-center flex-1 p-2 rounded  font-semibold uppercase`}
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
            if (itemInCart.includes(item.id)) {
              handleRemoveItemFromCart(item.id);
            } else {
              handleAddToCart(item);
            }
          }}
          className={`${
            addToCartButtonLoading === item.id
              ? 'bg-gray-300'
              : itemInCart.includes(item.id)
              ? 'bg-main-color'
              : 'bg-green-700'
          } text-main-text text-sm flex items-center justify-center flex-1 p-2 rounded  font-semibold uppercase`}
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
          ) : itemInCart.includes(item.id) ? (
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
        {/* <button
          onClick={() => handleAddToCart(item.id)}
          className="p-2 flex-1  text-sm border border-main-color text-main-color  rounded font-semibold mx-2  "
        >
          {formatMessage({ id: 'add-to-wishlist' })}
        </button> */}
      </div>
    </motion.div>
  );
}
