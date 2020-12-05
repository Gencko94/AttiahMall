import React from 'react';
// import { Helmet } from 'react-helmet';
import { CartAndWishlistProvider } from '../../../contexts/CartAndWishlistContext';
// import ErrorSnackbar from '../../ErrorSnackbar';
// import Layout from '../../Layout';
import GuestCartContainer from './GuestCartContainer';
import GuestCartRightSide from './GuestCartRightSide';

export default function GuestCart() {
  // const [errorOpen, setErrorOpen] = React.useState(false);
  // const [errorMessage, setErrorMessage] = React.useState('');
  // const [
  //   removefromCartButtonLoading,
  //   setRemoveFromCartButtonLoading,
  // ] = React.useState(null);
  // const closeErrorSnackbar = () => {
  //   setErrorOpen(false);
  // };
  const {
    guestCartItems,
    guestCartTotal,
    guestCartItemsLoading,
    // isGuestGetCartError,
    // getGuestCartError,
  } = React.useContext(CartAndWishlistProvider);
  return (
    <div className="cart-main-grid">
      <GuestCartContainer
        cartItemsLoading={guestCartItemsLoading}
        // handleRemoveItemFromCart={handleRemoveItemFromCart}
        cartItems={guestCartItems}
        // removefromCartButtonLoading={removefromCartButtonLoading}
        // handleRemoveItemFromWishlist={handleRemoveItemFromWishlist}
        // handleAddItemToWishlist={handleAddItemToWishlist}
        // addToWishListButtonLoading={addToWishListButtonLoading}
        cartTotal={guestCartTotal}
      />
      <GuestCartRightSide
        cartTotal={guestCartTotal}
        cartItems={guestCartItems}
        cartItemsLoading={guestCartItemsLoading}
        // setCheckOutModalOpen={setCheckOutModalOpen}
      />
    </div>
  );
}

//  <ItemsSlider
//   data={healthCare}
//   miniLogo={false}
//   type="healthCare"
//   title="Health Care Essentials"
//   isLightTheme={isLightTheme}
// />
//  <AnimatePresence>
//   {checkoutModalOpen && (
//     <CheckoutModal setCheckOutModalOpen={setCheckOutModalOpen} />
//   )}
// </AnimatePresence>
