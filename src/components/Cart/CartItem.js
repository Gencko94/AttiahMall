import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyImage from '../../helpers/LazyImage';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
export default function CartItem({
  item,
  handleRemoveItemFromCart,
  removefromCartButtonLoading,
  handleAddItemToWishlist,
  handleRemoveItemFromWishlist,
  wishlistItems,
}) {
  console.log(wishlistItems);
  const { EditItemFromCart } = React.useContext(DataProvider);
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
      className="cart-item py-2 border-b"
    >
      <Link to={`/${locale}/c/${item.id}`}>
        <LazyImage
          src={`${process.env.REACT_APP_IMAGES_URL}/original/${item.image}`}
          alt={`${item[`name_${locale}`]}`}
          pb="calc(100% * 286/210)"
        />
      </Link>
      <div className="">
        <Link to={`/${locale}/c/${item.id}`}>
          <h1 className="font-semibold ">{`${item[`name_${locale}`]}`}</h1>
        </Link>
        <h1 className=" font-semibold text-sm mb-1 text-green-700">
          {formatMessage({ id: 'in-stock' })}
        </h1>
        <div className="flex items-center mb-2">
          <h1 className=" font-semibold">
            {formatMessage({ id: 'quantity' })}
          </h1>
          <select
            value={item.qty}
            onChange={e => EditItemFromCart(e.target.value, item)}
            className="pr-8 py-0 mx-2 form-select border-gray-400 border rounded"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
        <div className="flex text-sm  items-center ">
          <button
            onClick={() => {
              handleRemoveItemFromCart(item.id, item.cart_id);
            }}
            className={`${
              removefromCartButtonLoading === item.id
                ? 'bg-gray-300'
                : 'bg-main-color'
            }  text-main-text text-sm flex items-center justify-center  p-2 rounded  font-semibold uppercase `}
            style={{ width: '200px' }}
            disabled={removefromCartButtonLoading}
          >
            {removefromCartButtonLoading === item.id ? (
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={21}
                width={21}
                visible={true}
              />
            ) : (
              <>
                <h1 className="mx-2 whitespace-no-wrap">
                  {formatMessage({ id: 'remove-from-cart' })}
                </h1>
              </>
            )}
          </button>
          <button
            onClick={() => {
              if (wishlistItems.includes(item.id)) {
                handleRemoveItemFromWishlist(item.id);
              } else {
                handleAddItemToWishlist(item);
              }
            }}
            className={`
              border mx-2
            text-sm p-2 rounded-full uppercase bg-gray-100  flex items-center justify-center font-semibold`}
          >
            {wishlistItems.includes(item.id) ? (
              <AiFillHeart
                className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
              />
            ) : (
              <AiOutlineHeart
                className={`w-25p h-25p hover:scale-125 text-main-color  transition-all duration-150 `}
              />
            )}
          </button>
        </div>
      </div>
      <div className="text-center font-bold">{item.price * item.qty} KD</div>
    </motion.div>
  );
}
