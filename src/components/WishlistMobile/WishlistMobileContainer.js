import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import CartEmptyMobile from '../CartMobile/CartEmptyMobile';
import MainContentLoader from '../CartMobile/ContentLoaders/MainContentLoader';
import WishlistMobileItem from './WishlistMobileItem';

export default function WishlistMobileContainer({
  wishlistItemsLoading,
  wishlistItems,
  itemInCart,
  handleRemoveItemFromCart,
  handleAddToCart,
  handleRemoveItemFromWishList,
  removeFromWishListButtonLoading,
  addToCartButtonLoading,
}) {
  if (wishlistItemsLoading) {
    return <MainContentLoader />;
  }
  return (
    <div>
      {wishlistItems.length === 0 && (
        <AnimatePresence>
          {wishlistItems.length === 0 && <CartEmptyMobile />}
        </AnimatePresence>
      )}
      {wishlistItems.length !== 0 && (
        <AnimateSharedLayout>
          <motion.div initial={false} layout className="mb-2">
            <AnimatePresence>
              {wishlistItems.map(item => (
                <WishlistMobileItem
                  key={item.id}
                  item={item}
                  handleAddToCart={handleAddToCart}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  handleRemoveItemFromWishList={handleRemoveItemFromWishList}
                  removeFromWishListButtonLoading={
                    removeFromWishListButtonLoading
                  }
                  itemInCart={itemInCart}
                  addToCartButtonLoading={addToCartButtonLoading}
                  wishlistItemsLoading={wishlistItemsLoading}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
      )}
    </div>
  );
}
