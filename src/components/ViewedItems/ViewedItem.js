import { motion } from 'framer-motion';
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

export default function ViewedItem({
  item,
  removeButtonLoading,
  handleRemoveItem,
}) {
  const { locale, formatMessage } = useIntl();
  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exited: {
      // x: 500,
      opacity: 0,
      // transition: {
      //   duration: 0.3,
      //   ease: 'easeOut',
      // },
    },
  };
  return (
    <motion.div
      layout
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="viewed-item"
    >
      <Link
        to={`/${locale}/${item.category.replace(
          /\s|%|,/g,
          '-'
        )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
      >
        <img src={item.photos.small} alt={item.name} />
      </Link>
      <div className="pt-2">
        <Link
          to={`/${locale}/${item.category.replace(
            /\s|%|,/g,
            '-'
          )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
        >
          <h1 className=" text-lg font-semibold text-clamp-2 ">{item.name}</h1>
        </Link>
        <Rating
          initialRating={item.rating}
          readonly
          emptySymbol={<AiOutlineStar className="text-main-color" />}
          fullSymbol={<AiFillStar className="text-main-color" />}
          className=" pt-1"
        />
        <button
          onClick={() => handleRemoveItem(item.id)}
          className={`${
            removeButtonLoading === item.id
              ? 'bg-gray-600'
              : 'bg-main-color text-main-text'
          } flex items-center justify-center p-2 rounded`}
          style={{ width: '76px' }}
        >
          {removeButtonLoading === item.id ? (
            <MoonLoader size={15} color="#b72b2b" />
          ) : (
            formatMessage({ id: 'remove' })
          )}
        </button>
      </div>
    </motion.div>
  );
}
