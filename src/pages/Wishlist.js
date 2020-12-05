import React from 'react';
import { Helmet } from 'react-helmet';
import CartLoader from '../components/Cart/loaders/CartLoader';
import Layout from '../components/Layout';
import WishlistContainer from '../components/Wishlist/WishlistContainer';
import WishlistRightSide from '../components/Wishlist/WishlistRightSide';
import { AuthProvider } from '../contexts/AuthContext';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';

export default function Wishlist({ userId }) {
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    null
  );
  const { authenticationLoading } = React.useContext(AuthProvider);
  const [cartItems, setCartItems] = React.useState([]);
  const {
    wishlistItems,
    wishlistItemsLoading,
    isGetWishlistError,
    removeFromWishListMutation,
    addToCartMutation,
    removeFromCartMutation,
  } = React.useContext(CartAndWishlistProvider);

  const handleRemoveItemFromWishList = async id => {
    setRemoveFromWishListButtonLoading(id);
    try {
      await removeFromWishListMutation({ id, userId });
      setRemoveFromWishListButtonLoading(null);
    } catch (error) {
      setRemoveFromWishListButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleAddToCart = async item => {
    setAddToCartButtonLoading(item.id);
    const newItem = {
      id: item.id,
      quantity: 1,
    };
    try {
      await addToCartMutation({ newItem, userId });
      setAddToCartButtonLoading(null);
      setCartItems(prev => {
        return [...prev, item.id];
      });
    } catch (error) {
      setAddToCartButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleRemoveFromCart = async id => {
    setAddToCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, userId });
      setAddToCartButtonLoading(null);
      setCartItems(prev => {
        return prev.filter(i => i !== id);
      });
    } catch (error) {
      setAddToCartButtonLoading(null);
      console.log(error.response);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Wishlist | MRG</title>
      </Helmet>
      <div className="px-4 py-2 max-w-default mx-auto">
        {authenticationLoading && <CartLoader />}
        {!authenticationLoading && userId && !isGetWishlistError && (
          <div className="wishlist-main-grid">
            <WishlistContainer
              wishlistItemsLoading={wishlistItemsLoading}
              wishlistItems={wishlistItems}
              handleRemoveItemFromWishList={handleRemoveItemFromWishList}
              removeFromWishListButtonLoading={removeFromWishListButtonLoading}
              addToCartButtonLoading={addToCartButtonLoading}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              cartItems={cartItems}
            />
            <WishlistRightSide
              wishlistItems={wishlistItems}
              wishlistItemsLoading={wishlistItemsLoading}
            />
          </div>
        )}
      </div>
    </Layout>
  );
}
