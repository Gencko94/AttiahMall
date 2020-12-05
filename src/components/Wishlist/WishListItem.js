import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export default function WishListItem({
  item,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
  addToCartButtonLoading,
  handleAddToCart,
  handleRemoveFromCart,
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
      <Link
        to={`/${locale}/${item.category.replace(
          /\s|%|,/g,
          '-'
        )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
      >
        <img className="" src={item.photo} alt={item.name} />
      </Link>
      <div className="">
        <Link
          to={`/${locale}/${item.category.replace(
            /\s|%|,/g,
            '-'
          )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
        >
          <h1 className="font-semibold ">{item.name}</h1>
        </Link>
        <h1 className=" font-semibold text-sm mb-1 text-green-700">
          {formatMessage({ id: 'in-stock' })}
        </h1>
        <Rating
          initialRating={item.rating}
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
              <MoonLoader size={18} color="#b72b2b" />
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
              if (item.itemInCart) {
                handleRemoveFromCart(item.id);
              } else {
                handleAddToCart(item);
              }
            }}
            className={`${
              addToCartButtonLoading
                ? 'bg-gray-300'
                : item.itemInCart
                ? 'bg-main-color'
                : 'bg-green-700'
            }  text-main-text   p-2 rounded flex items-center justify-center mx-2 font-semibold uppercase`}
            style={{ width: '200px' }}
          >
            {addToCartButtonLoading ? (
              <MoonLoader size={19} color="#b72b2b" />
            ) : item.itemInCart ? (
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
