import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';

import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import Layout from '../components/Layout';
import CartContainer from '../components/Cart/CartContainer';
import CartRightSide from '../components/Cart/CartRightSide';
import { AnimatePresence } from 'framer-motion';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import { AuthProvider } from '../contexts/AuthContext';
import GuestCart from '../components/Cart/GuestCart.js/GuestCart';
import CartLoader from '../components/Cart/loaders/CartLoader';
import { useIntl } from 'react-intl';
import StaticSwiper from '../components/Swipers/StaticSwiper';
export default function Cart() {
  const {
    cartItems,
    cartTotal,
    cartItemsLoading,
    isGetCartError,
    removeFromCartMutation,
    addToWishListMutation,
    removeFromWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { userId, authenticationLoading } = React.useContext(AuthProvider);
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(null);

  const [wishlistItems, setWishlistItems] = React.useState([]);
  const { formatMessage } = useIntl();
  const handleRemoveItemFromCart = async (id, cart_id) => {
    console.log(cart_id);
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, userId, cart_id });
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleRemoveItemFromWishlist = async id => {
    try {
      await removeFromWishListMutation({ id, userId });
      console.log(wishlistItems.filter(item => item.id !== id));
      setWishlistItems(prev => {
        return prev.filter(item => item !== id);
      });
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleAddItemToWishlist = async item => {
    try {
      await addToWishListMutation({ id: item.id, userId });
      setWishlistItems(prev => {
        return [...prev, item.id];
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  if (!cartItemsLoading && isGetCartError) {
    return (
      <Layout>
        <div className="px-4 py-2 max-w-default mx-auto min-h-screen">
          <h1>{formatMessage({ id: 'something-went-wrong-snackbar' })}</h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <Helmet>
        <title>Cart | MRG</title>
      </Helmet>

      <div className="px-4 py-2 max-w-default mx-auto">
        {authenticationLoading && <CartLoader />}
        {!authenticationLoading && userId && !isGetCartError && (
          <div className="cart-main-grid">
            <CartContainer
              cartItemsLoading={cartItemsLoading}
              handleRemoveItemFromCart={handleRemoveItemFromCart}
              cartItems={cartItems}
              removefromCartButtonLoading={removefromCartButtonLoading}
              handleRemoveItemFromWishlist={handleRemoveItemFromWishlist}
              handleAddItemToWishlist={handleAddItemToWishlist}
              cartTotal={cartTotal}
              wishlistItems={wishlistItems}
            />
            <CartRightSide
              cartTotal={cartTotal}
              cartItems={cartItems}
              cartItemsLoading={cartItemsLoading}
              setCheckOutModalOpen={setCheckOutModalOpen}
            />
          </div>
        )}
        {!authenticationLoading && !userId && <GuestCart />}
        <StaticSwiper type="electronics" />
        <AnimatePresence>
          {checkoutModalOpen && (
            <CheckoutModal setCheckOutModalOpen={setCheckOutModalOpen} />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}
