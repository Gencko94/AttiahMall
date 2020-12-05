import React from 'react';
import MainContentLoader from '../components/CartMobile/ContentLoaders/MainContentLoader';
import { useIntl } from 'react-intl';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import MobileCartLoader from '../components/CartMobile/ContentLoaders/MobileCartLoader';
import { AuthProvider } from '../contexts/AuthContext';
import WishlistMobileContainer from '../components/WishlistMobile/WishlistMobileContainer';
import Layout from '../components/Layout';
export default function WishlistMobile({ userId }) {
  const { formatMessage } = useIntl();
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    null
  );
  const [itemInCart, setItemInCart] = React.useState([]);
  const {
    wishlistItems,
    wishlistItemsLoading,
    isGetWishlistError,
    removeFromWishListMutation,
    addToCartMutation,
    removeFromCartMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { authenticationLoading } = React.useContext(AuthProvider);
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
    const addedItem = {
      id: item.id,
      quantity: 1,
    };
    try {
      await addToCartMutation({ addedItem, userId });
      setAddToCartButtonLoading(null);
      setItemInCart(prev => {
        return [...prev, item.id];
      });
    } catch (error) {
      setAddToCartButtonLoading(null);
      console.log(error.response);
    }
  };
  const handleRemoveItemFromCart = async id => {
    setAddToCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, userId });
      setAddToCartButtonLoading(null);
      setItemInCart(prev => {
        return prev.filter(i => i !== id);
      });
    } catch (error) {
      setAddToCartButtonLoading(null);
      console.log(error.response);
    }
  };
  if (isGetWishlistError) {
    return (
      <Layout>
        <div
          className="py-1 mx-2 flex items-center justify-center"
          style={{ minHeight: 'calc(-80px + 100vh)' }}
        >
          <h1>{formatMessage({ id: 'something-went-wrong-snackbar' })}</h1>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className=" py-1 px-2">
        {authenticationLoading && <MobileCartLoader />}
        {wishlistItemsLoading && <MainContentLoader />}

        {!wishlistItemsLoading && !isGetWishlistError && (
          <WishlistMobileContainer
            itemInCart={itemInCart}
            handleAddToCart={handleAddToCart}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            handleRemoveItemFromWishList={handleRemoveItemFromWishList}
            addToCartButtonLoading={addToCartButtonLoading}
            removeFromWishListButtonLoading={removeFromWishListButtonLoading}
            wishlistItems={wishlistItems}
            wishlistItemsLoading={wishlistItemsLoading}
          />
        )}

        <hr />
        {/* <ItemsSlider
          type="phone"
          miniLogo={false}
          title="Save Big with Phones & Tablets"
        /> */}
      </div>
    </Layout>
  );
}
