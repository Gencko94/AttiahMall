import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import { useIntl } from 'react-intl';
import { AnimatePresence } from 'framer-motion';
import CheckoutPopupMobile from '../components/CartMobile/CheckoutPopupMobile';
import { AuthProvider } from '../contexts/AuthContext';
import { useHistory } from 'react-router-dom';
import MobileCheckoutSection from '../components/CartMobile/MobileCheckoutSection';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import MobileCartLoader from '../components/CartMobile/ContentLoaders/MobileCartLoader';
import MobileCartContainer from '../components/CartMobile/MobileCartContainer';
import MobileGuestCart from '../components/CartMobile/MobileGuestCart/MobileGuestCart';
import StaticSwiper from '../components/Swipers/StaticSwiper';
import Layout from '../components/Layout';
import CartEmptyMobile from '../components/CartMobile/CartEmptyMobile';

export default function CartMobile() {
  const { formatMessage, locale } = useIntl();
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(null);

  const { isAuthenticated, userId, authenticationLoading } = React.useContext(
    AuthProvider
  );
  const [checkoutPopupOpen, setCheckOutPopupOpen] = React.useState(false);
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const {
    cartItems,
    cartTotal,
    cartItemsLoading,
    isGetCartError,
    removeFromCartMutation,
    addToWishListMutation,
    removeFromWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const history = useHistory();

  const handleRemoveItemFromCart = async (id, cart_id) => {
    console.log(id);
    setRemoveFromCartButtonLoading(id);
    try {
      await removeFromCartMutation({ id, userId, cart_id });
      setRemoveFromCartButtonLoading(null);
    } catch (error) {
      setRemoveFromCartButtonLoading(null);
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
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setCheckOutPopupOpen(true);
    } else {
      history.push(`/${locale}/checkout`);
    }
  };
  if (isGetCartError) {
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
      <div className=" py-1 px-2 relative">
        <AnimatePresence>
          {checkoutPopupOpen && (
            <CheckoutPopupMobile setCheckOutPopupOpen={setCheckOutPopupOpen} />
          )}
        </AnimatePresence>

        {authenticationLoading && <MobileCartLoader />}
        <AnimatePresence>
          {!authenticationLoading &&
            userId &&
            !cartItemsLoading &&
            !isGetCartError &&
            cartItems.length === 0 && <CartEmptyMobile />}
        </AnimatePresence>
        {!authenticationLoading &&
          userId &&
          !isGetCartError &&
          cartItems?.length !== 0 && (
            <>
              <MobileCheckoutSection
                cartItemsLoading={cartItemsLoading}
                cartItems={cartItems}
                handleCheckout={handleCheckout}
                cartTotal={cartTotal}
              />

              <MobileCartContainer
                cartItems={cartItems}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                removefromCartButtonLoading={removefromCartButtonLoading}
                cartItemsLoading={cartItemsLoading}
                wishlistItems={wishlistItems}
                handleAddItemToWishlist={handleAddItemToWishlist}
                handleRemoveItemFromWishlist={handleRemoveItemFromWishlist}
              />
            </>
          )}
        {!authenticationLoading && !userId && <MobileGuestCart />}

        {/* <RecentlyVisitedHorizontal visitedItems={visitedItems} /> */}

        <StaticSwiper type="electronics" />
      </div>
    </Layout>
  );
}
// {!isLoading && data.length !== 0 && (
//         <CheckoutButton
//           data={data}
//           cartTotal="50"
//           handleCheckout={handleCheckout}
//         />
//       )}
