import React from 'react';
// import RecentlyVisitedHorizontal from '../components/Cart/RecentlyVisitedHorizontal';
import { DataProvider } from '../contexts/DataContext';

import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import { Helmet } from 'react-helmet';
import CheckoutModal from '../components/Cart/CheckoutModal';
import useClickAway from '../hooks/useClickAway';
import Layout from '../components/Layout';
import { queryCache, useMutation, useQuery } from 'react-query';
import ErrorSnackbar from '../components/ErrorSnackbar';
import CartContainer from '../components/Cart/CartContainer';
import CartRightSide from '../components/Cart/CartRightSide';
export default function Cart() {
  const {
    healthCare,
    isLightTheme,
    getCartItems,
    removeItemFromCart,
    addItemToWishListFromCart,
    removeItemFromWishListFromCart,
  } = React.useContext(DataProvider);
  /**
   * Main Fetch
   */
  const { data, isLoading, refetch } = useQuery(
    'cartItems',
    async () => {
      const res = await getCartItems();
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onError: error => {
        setErrorOpen(true);
        setErrorMessage(error);
      },
    }
  );

  /**
   * Remove From Cart Mutation
   */
  const [removeFromCartMutation] = useMutation(
    async id => {
      setRemoveFromCartButtonLoading(id);
      const res = await removeItemFromCart(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('cartItems', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
          };
        });
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            cart: data.cartItems.length,
          };
        });
        queryCache.setQueryData('wishListItems', prev => {
          return {
            ...prev,
            wishListItems: data.wishListItems,
          };
        });
        setRemoveFromCartButtonLoading(null);
        refetch();
      },
      onError: error => {
        setErrorOpen(true);
        setErrorMessage(error);
      },
    }
  );

  /**
   * add to wishlist mutation
   */

  const [addToWishListMutation] = useMutation(
    async item => {
      setAddToWishListButtonLoading(item.id);
      const res = await addItemToWishListFromCart(item);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            wishlist: data.wishListItems.length,
          };
        });
        queryCache.setQueryData('cartItems', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
          };
        });
        queryCache.setQueryData('wishListItems', () => {
          return {
            wishListItems: data.wishListItems,
          };
        });
        setAddToWishListButtonLoading(null);
      },
    }
  );
  /**
   * remove from wishlist mutation
   */

  const [removeFromWishListMutation] = useMutation(
    async id => {
      setAddToWishListButtonLoading(id);
      const res = await removeItemFromWishListFromCart(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            wishlist: data.wishListItems.length,
          };
        });
        queryCache.setQueryData('cartItems', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
          };
        });
        queryCache.setQueryData('wishListItems', () => {
          return {
            wishListItems: data.wishListItems,
          };
        });
        setAddToWishListButtonLoading(null);
      },
    }
  );
  const [checkoutModalOpen, setCheckOutModalOpen] = React.useState(false);
  const [
    removefromCartButtonLoading,
    setRemoveFromCartButtonLoading,
  ] = React.useState(null);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(null);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const modalRef = React.useRef();
  useClickAway(modalRef, () => {
    setCheckOutModalOpen(false);
  });
  const handleRemoveItemFromCart = async id => {
    try {
      await removeFromCartMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveItemFromWishlist = async id => {
    try {
      await removeFromWishListMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddItemToWishlist = async item => {
    try {
      await addToWishListMutation(item);
    } catch (error) {
      console.log(error);
    }
  };
  const closeErrorSnackbar = () => {
    setErrorOpen(false);
  };
  return (
    <Layout>
      <Helmet>
        <title>Cart | AttiahMall</title>
      </Helmet>
      {errorOpen && (
        <ErrorSnackbar
          message={errorMessage}
          closeFunction={closeErrorSnackbar}
        />
      )}
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className=" cart-main-grid  ">
          <CartContainer
            isLoading={isLoading}
            handleRemoveItemFromCart={handleRemoveItemFromCart}
            data={data}
            removefromCartButtonLoading={removefromCartButtonLoading}
            handleRemoveItemFromWishlist={handleRemoveItemFromWishlist}
            handleAddItemToWishlist={handleAddItemToWishlist}
            addToWishListButtonLoading={addToWishListButtonLoading}
          />
          <CartRightSide
            data={data}
            isLoading={isLoading}
            setCheckOutModalOpen={setCheckOutModalOpen}
          />
        </div>
        <ItemsSlider
          data={healthCare}
          miniLogo={false}
          type="healthCare"
          title="Health Care Essentials"
          isLightTheme={isLightTheme}
        />
        <CheckoutModal
          checkoutModalOpen={checkoutModalOpen}
          isLightTheme={isLightTheme}
          modalRef={modalRef}
          setCheckOutModalOpen={setCheckOutModalOpen}
        />
      </div>
    </Layout>
  );
}
