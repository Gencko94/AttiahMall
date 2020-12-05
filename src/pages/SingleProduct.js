import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import InView from 'react-intersection-observer';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductLoader from '../components/SingleProduct/SingleProductLoader';
import AdditionalDetails from '../components/SingleProduct/AdditionalDetails';

export default function SingleProduct() {
  const { id, name } = useParams();
  const {
    deliveryCountry,
    addItemToCart,
    removeItemFromCart,
    allItems,
    addItemToWishList,
    removeItemFromWishList,
    getSingleItemDetails,
  } = React.useContext(DataProvider);
  const quantityOptions = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
  ];

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProduct', id],
    async (key, id) => {
      const res = await getSingleItemDetails(id);
      return res;
    },
    { refetchOnWindowFocus: false }
  );

  /**
   * Add Mutation
   */

  const [addToCartMutation] = useMutation(
    async item => {
      setAddToCartButtonLoading(true);
      const res = await addItemToCart(item);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData(['singleProduct', id], prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
            itemInCart: true,
          };
        });
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
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
      },
    }
  );
  const [addToWishListMutation] = useMutation(
    async item => {
      setAddToWishListButtonLoading(true);
      const res = await addItemToWishList(item);
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
        queryCache.setQueryData('wishListItems', prev => {
          return {
            ...prev,
            wishListItems: data.wishListItems,
          };
        });

        queryCache.setQueryData(['singleProduct', id], prev => {
          return {
            ...prev,
            itemInWishList: true,
          };
        });
        setAddToWishListButtonLoading(false);
        // setSideMenuOpen(true);
      },
    }
  );
  /**
   * Remove Mutation
   */

  const [removeFromCartMutation] = useMutation(
    async id => {
      setAddToCartButtonLoading(true);
      const res = await removeItemFromCart(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData(['singleProduct', id], prev => {
          return {
            ...prev,
            cartItems: data.cartItems,
            cartTotal: data.cartTotal,
            itemInCart: false,
          };
        });
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
        setAddToCartButtonLoading(false);
      },
    }
  );
  const [removeFromWishListMutation] = useMutation(
    async id => {
      setAddToWishListButtonLoading(true);
      const res = await removeItemFromWishList(id);
      return res;
    },
    {
      onSuccess: data => {
        queryCache.setQueryData(['singleProduct', id], prev => {
          return {
            ...prev,
            itemInWishList: false,
          };
        });
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
        setAddToWishListButtonLoading(false);
      },
    }
  );
  const [quantity, setQuantity] = React.useState(quantityOptions[0]);
  const [size, setSize] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [related, setRelated] = React.useState(null);

  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);
  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const handleAddToCart = async () => {
    try {
      await addToCartMutation({
        id: data.item.id,
        quantity: quantity.value,
        price: data.item.price,
        name: data.item.name,
        photo: data.item.photos.small,
        category: data.item.category,
        size,
        color,
        rating: data.item.rating,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddToWishList = async () => {
    try {
      await addToWishListMutation({
        id: data.item.id,
        quantity: quantity.value,
        price: data.item.price,
        name: data.item.name,
        photo: data.item.photos.small,
        category: data.item.category,
        size,
        color,
        rating: data.rating,
      });
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
  const handleRemoveFromWishList = async id => {
    try {
      await removeFromWishListMutation(id);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = () => {
    setTimeout(() => {
      setRelated(relatedData);

      setFetching(false);
    }, 1500);
  };

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  // Add item to localStorage //
  React.useEffect(() => {
    const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
    const isItemInHistory = visitedItems.find(item => item.id === id);
    if (isItemInHistory !== undefined) {
      return;
    } else {
      visitedItems.push({ id });
      localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
    }
  }, [id]);

  return (
    <Layout>
      <Helmet>
        <title>{` Shop ${name.split('-').join(' ')} on AttiahMall`} </title>
        <meta
          name="description"
          content={`Shop  ${name.split('-').join(' ')} | AttiahMall`}
        />
      </Helmet>

      <AnimatePresence>
        {sideMenuOpen && (
          <SideCartMenu
            key={879}
            cartItems={data.cartItems}
            cartTotal={data.cartTotal}
            setSideMenuOpen={setSideMenuOpen}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        )}
        {sideMenuOpen && (
          <motion.div
            key={268}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSideMenuOpen(false)}
            className="side__addCart-bg"
          ></motion.div>
        )}
      </AnimatePresence>

      <div className=" px-4 ">
        <div className="mx-auto max-w-default">
          <Breadcrumbs />
          {isLoading && <SingleProductLoader />}
          {!isLoading && (
            <div className="single-product__container-desktop">
              <div className=" ">
                <ImageZoom
                  data={{ images: data.item.photos.main, name: data.item.name }}
                />
              </div>

              <MiddleSection
                data={data.item}
                deliveryCountry={deliveryCountry}
                setColor={setColor}
                color={color}
                setSize={setSize}
                size={size}
              />
              <RightSection
                data={data.item}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
                handleAddToWishList={handleAddToWishList}
                handleRemoveFromWishList={handleRemoveFromWishList}
                handleRemoveFromCart={handleRemoveFromCart}
                quantityOptions={quantityOptions}
                addToCartButtonLoading={addToCartButtonLoading}
                addToWishListButtonLoading={addToWishListButtonLoading}
                itemInCart={data.itemInCart}
                itemInWishList={data.itemInWishList}
              />
            </div>
          )}
          <div id="details" className="py-2 mb-2">
            {!isLoading && <AdditionalDetails data={data.item} />}
          </div>
          {related && <RelatedItems relatedData={related} />}
          {isFetching && <div>Loading ...</div>}
          <InView
            as="div"
            onChange={(inView, entry) => {
              handleLoadMore(inView);
            }}
          >
            <div></div>
          </InView>
        </div>
      </div>
    </Layout>
  );
}
