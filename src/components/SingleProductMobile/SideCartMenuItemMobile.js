import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Link } from 'react-router-dom';
import LazyImage from '../../helpers/LazyImage';
export default function SideCartMenuItemMobile({
  item,
  removeFromCartButtonLoading,
  handleRemoveFromCart,
}) {
  const { locale, formatMessage } = useIntl();
  const cartItemVariant = {
    hidden: {
      x: `${locale === 'ar' ? '100%' : '-100%'}`,
    },
    visible: {
      x: 0,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={cartItemVariant}
      initial="hidden"
      animate="visible"
      exit="exited"
      className=" side-cart-menu__item-mobile mb-2"
    >
      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          className="hover:underline"
          to={`/${locale}/c/${item.id}`}
        >
          <LazyImage
            src={`${process.env.REACT_APP_IMAGES_URL}/small/${item.image}`}
            pb="100% * 204/150"
            alt={`${item[`name_${locale}`]}`}
          ></LazyImage>
        </Link>
      </div>
      <div className="">
        <Link
          title={`${item[`name_${locale}`]}`}
          className="hover:underline"
          to={`/${locale}/c/${item.id}`}
        >
          <h1 className="text-clamp-2 text-xs font-semibold">
            {`${item[`name_${locale}`]}`}
          </h1>
        </Link>

        <h1 className="text-xs rounded p-1 font-bold  bg-gray-200 inline">
          {item.price * item.qty} SAR
        </h1>
        <div>
          <button
            className={`${
              removeFromCartButtonLoading === item.id
                ? 'bg-gray-300'
                : 'bg-main-color text-main-text'
            } text-xs rounded p-1 my-1 uppercase`}
            onClick={() => {
              handleRemoveFromCart(item.id, item.cart_id);
            }}
          >
            {removeFromCartButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={20}
                width={20}
                visible={true}
              />
            ) : (
              formatMessage({ id: 'remove-from-cart' })
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
