import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import CartContainerLoader from '../Cart/loaders/CartContainerLoader';
import NoWishListItems from './NoWishListItems';
import WishListItem from './WishListItem';

export default function WishlistContainer({
  wishlistItemsLoading,
  wishlistItems,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
  addToCartButtonLoading,
  handleRemoveFromCart,
  handleAddToCart,
  cartItems,
}) {
  const { formatMessage, locale } = useIntl();
  if (wishlistItemsLoading) {
    return <CartContainerLoader locale={locale} />;
  }
  return (
    <div>
      {wishlistItems.length === 0 && <NoWishListItems />}
      {wishlistItems.length !== 0 && (
        <AnimateSharedLayout>
          <motion.div layout initial={false} className="grid grid-cols-1 gap-2">
            <motion.div layout className="wishlist-grid-titles mb-2">
              <h1 className="  ">{formatMessage({ id: 'wishlist' })}</h1>
            </motion.div>
            <motion.hr layout />
            <AnimatePresence>
              {wishlistItems.map(item => {
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
                    cartItems={cartItems}
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
