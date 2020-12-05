import React from 'react';

import { DataProvider } from '../contexts/DataContext';
import { useInView } from 'react-intersection-observer';
import { Helmet } from 'react-helmet';
import ImageZoomMobile from '../components/SingleProductMobile/ImageZoomMobile';
import ItemDescription from '../components/SingleProductMobile/ItemDescription';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import FloatingAddToCart from '../components/SingleProductMobile/FloatingAddToCart';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductMobileLoader from '../components/SingleProductMobile/SingleProductMobileLoader';
import AdditionalDetailsMobile from '../components/SingleProductMobile/AdditionalDetailsMobile';
import { getProductReviews, getSingleItem } from '../Queries/Queries';
import { useParams } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';
import Layout from '../components/Layout';

export default function SingleProductMobile() {
  const { id } = useParams();
  const { addViewedItems } = React.useContext(DataProvider);

  const { userId } = React.useContext(AuthProvider);
  const {
    addToCartMutation,

    removeFromWishListMutation,
    addToWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);

  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  // const [isFetching, setFetching] = React.useState(true);
  // const [page, setPage] = React.useState(0);
  // const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  // const [related, setRelated] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [detailsTab, setDetailsTab] = React.useState(0);

  const [triggerRef, inView] = useInView();

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProduct', id],
    async (key, id) => {
      const res = await getSingleItem(id);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: async () => {
        // add Item to localStorage
        return await addViewedItems(id);
      },
    }
  );
  const { data: reviews, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    getProductReviews,
    { retry: true, enabled: data }
  );

  const handleAddToWishList = async () => {
    try {
      await addToWishListMutation({ id: data.id, userId });
      setItemInWishList(true);
    } catch (error) {
      console.clear();
      setItemInWishList(true);
      console.log(error.response);
    }
  };
  const handleRemoveFromWishList = async id => {
    try {
      await removeFromWishListMutation({ id, userId });
      setItemInWishList(false);
    } catch (error) {
      console.clear();
      console.log(error.response);
    }
  };
  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    setAddToCartButtonLoading(true);
    try {
      const newItem = { id: data.id, quantity: quantity, size, color };
      await addToCartMutation({ newItem, userId });
      setAddToCartButtonLoading(false);
      setSideMenuOpen(true);
      setItemInCart(true);
    } catch (error) {
      console.clear();

      if (error.response.data.message === 'Item founded on the Cart') {
        setItemInCart(true);
      }
      console.log(error.response);
      setAddToCartButtonLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        {/* <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`${name.split('-').join(' ')} | MRG`}
        /> */}
      </Helmet>
      <div className="overflow-hidden">
        <AnimatePresence>
          {sideMenuOpen && (
            <SideCartMenuMobile key={998} setSideMenuOpen={setSideMenuOpen} />
          )}
          {sideMenuOpen && (
            <motion.div
              key={369}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSideMenuOpen(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}
        </AnimatePresence>

        {isLoading && <SingleProductMobileLoader />}
        {!isLoading && (
          <div className="">
            <ImageZoomMobile data={data} />

            <hr />
            <div className="flex flex-col w-full  px-3 py-2 bg-white">
              <ItemDescription
                handleAddToCart={handleAddToCart}
                handleAddToWishList={handleAddToWishList}
                data={data}
                itemInCart={itemInCart}
                itemInWishList={itemInWishList}
                addToCartButtonLoading={addToCartButtonLoading}
                quantity={quantity}
                setQuantity={setQuantity}
                size={size}
                setSize={setSize}
                color={color}
                setColor={setColor}
                reviews={data.reviews}
                rating={data.rating}
                setDetailsTab={setDetailsTab}
                userId={userId}
                handleRemoveFromWishList={handleRemoveFromWishList}
              />

              <hr />
            </div>
          </div>
        )}
        {!isLoading && (
          <AdditionalDetailsMobile
            data={data}
            detailsTab={detailsTab}
            setDetailsTab={setDetailsTab}
            reviews={reviews}
            reviewsLoading={reviewsLoading}
          />
        )}
        <br ref={triggerRef} />
        <AnimatePresence>
          {inView && !itemInCart && !isLoading && (
            <FloatingAddToCart
              handleSubstractQuantity={handleSubstractQuantity}
              quantity={quantity}
              handleAddQuantity={handleAddQuantity}
              handleAddToCart={handleAddToCart}
              id={data.id}
              price={data.simple_addons.price}
              addToCartButtonLoading={addToCartButtonLoading}
              itemInCart={itemInCart}
            />
          )}
        </AnimatePresence>

        <hr />
      </div>
    </Layout>
  );
}
