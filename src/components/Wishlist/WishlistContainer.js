import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import CartContainerLoader from '../Cart/loaders/CartContainerLoader';
import NoWishListItems from './NoWishListItems';
import WishListItem from './WishListItem';

export default function WishlistContainer({
  isLoading,
  data,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
  addToCartButtonLoading,
  handleRemoveFromCart,
  handleAddToCart,
}) {
  const { formatMessage, locale } = useIntl();
  if (isLoading) {
    return <CartContainerLoader locale={locale} />;
  }
  return (
    <div>
      {data.wishListItems.length === 0 && <NoWishListItems />}
      {data.wishListItems.length !== 0 && (
        <AnimateSharedLayout>
          <motion.div layout className="grid grid-cols-1 gap-2">
            <div className="wishlist-grid-titles mb-2">
              <h1 className="  ">{formatMessage({ id: 'wishlist' })}</h1>
              {/* <h1 className="  ">{formatMessage({ id: 'the-item' })}</h1> */}
            </div>
            <hr />
            <AnimatePresence>
              {data.wishListItems.map(item => {
                return (
                  <WishListItem
                    key={item.id}
                    item={item}
                    handleRemoveItemFromWishList={handleRemoveItemFromWishList}
                    removeFromWishListButtonLoading={
                      removeFromWishListButtonLoading
                    }
                    addToCartButtonLoading={addToCartButtonLoading}
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
      )}
    </div>
  );
}
