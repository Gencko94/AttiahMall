import React from 'react';
import { Helmet } from 'react-helmet';
import { queryCache, useMutation, useQuery } from 'react-query';
import Layout from '../components/Layout';
import WishlistContainer from '../components/Wishlist/WishlistContainer';
import WishlistRightSide from '../components/Wishlist/WishlistRightSide';
import { DataProvider } from '../contexts/DataContext';

export default function Wishlist() {
  const [
    removeFromWishListButtonLoading,
    setRemoveFromWishListButtonLoading,
  ] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    null
  );
  const {
    getWishListItems,
    addItemToCartFromWishlist,
    removeItemFromCartFromWishlist,
    removeItemFromWishList,
  } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading, refetch } = useQuery(
    'wishListItems',
    async () => {
      const res = await getWishListItems();
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onError: error => {
        // setErrorOpen(true);
        // setErrorMessage(error);
      },
    }
  );

  /**
   * Remove From WishList Mutation
   */
  const [removeFromWishListMutation] = useMutation(
    async id => {
      setRemoveFromWishListButtonLoading(id);
      const res = await removeItemFromWishList(id);
      return res;
    },
    {
      onSuccess: data => {
        console.log(data);
        queryCache.setQueryData('wishListItems', prev => {
          return {
            ...prev,
            wishListItems: data.wishListItems,
          };
        });
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            wishlist: data.wishListItems.length,
          };
        });
        setRemoveFromWishListButtonLoading(null);
        refetch();
      },
      onError: error => {
        // setErrorOpen(true);
        // setErrorMessage(error);
      },
    }
  );

  /**
   * Add to Cart Mutation
   */

  const [addToCartMutation] = useMutation(
    async item => {
      setAddToCartButtonLoading(item.id);
      const res = await addItemToCartFromWishlist(item);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            cart: data.cartItems.length,
          };
        });
        queryCache.setQueryData('cartItems', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
          };
        });
        queryCache.setQueryData('wishListItems', () => {
          return {
            wishListItems: data.wishListItems,
          };
        });
        setAddToCartButtonLoading(null);
      },
    }
  );
  const [removeFromCartMutation] = useMutation(
    async id => {
      setAddToCartButtonLoading(id);
      const res = await removeItemFromCartFromWishlist(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('cartAndWishListLength', prev => {
          return {
            ...prev,
            cart: data.cartItems.length,
          };
        });
        queryCache.setQueryData('cartItems', prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
          };
        });
        queryCache.setQueryData('wishListItems', () => {
          return {
            wishListItems: data.wishListItems,
          };
        });
        setAddToCartButtonLoading(null);
      },
    }
  );

  const handleRemoveItemFromWishList = async id => {
    try {
      await removeFromWishListMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToCart = async item => {
    try {
      await addToCartMutation(item);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemoveFromCart = async id => {
    try {
      await removeFromCartMutation(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Wishlist | AttiahMall</title>
      </Helmet>
      <div className="px-4 py-2 max-w-default mx-auto">
        <div className="wishlist-main-grid">
          <WishlistContainer
            isLoading={isLoading}
            data={data}
            handleRemoveItemFromWishList={handleRemoveItemFromWishList}
            removeFromWishListButtonLoading={removeFromWishListButtonLoading}
            addToCartButtonLoading={addToCartButtonLoading}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
          <WishlistRightSide data={data} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  );
}
