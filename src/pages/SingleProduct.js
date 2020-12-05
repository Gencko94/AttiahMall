import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import Breadcrumbs from '../components/SingleProduct/Breadcrumbs';
import ImageZoom from '../components/SingleProduct/ImageZoom';
import MiddleSection from '../components/SingleProduct/MiddleSection';
import RightSection from '../components/SingleProduct/RightSection';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import { useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductLoader from '../components/SingleProduct/SingleProductLoader';
import AdditionalDetails from '../components/SingleProduct/AdditionalDetails';
import { getProductReviews, getSingleItem } from '../Queries/Queries';
import { AuthProvider } from '../contexts/AuthContext';
import { CartAndWishlistProvider } from '../contexts/CartAndWishlistContext';

export default function SingleProduct() {
  const { id } = useParams();
  const { deliveryCountry, addViewedItems } = React.useContext(DataProvider);
  const {
    addToCartMutation,

    addToWishListMutation,
  } = React.useContext(CartAndWishlistProvider);
  const { userId, isAuthenticated } = React.useContext(AuthProvider);
  const [selectedVariation, setSelectedVariant] = React.useState(0);
  const [selectedSize, setSelectedSize] = React.useState(0);
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
      const res = await getSingleItem(id);
      return res;
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: async () => {
        // add Item to localStorage
        return await addViewedItems(id);
      },
      retry: true,
    }
  );
  const { data: reviews, isLoading: reviewsLoading } = useQuery(
    ['product-reviews', id],
    getProductReviews,
    { retry: true, enabled: data }
  );
  const [quantity, setQuantity] = React.useState(quantityOptions[0]);
  const [size, setSize] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  // const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [itemInCart, setItemInCart] = React.useState(false);
  const [itemInWishList, setItemInWishList] = React.useState(false);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [detailsTab, setDetailsTab] = React.useState(0);
  const [
    addToWishListButtonLoading,
    setAddToWishListButtonLoading,
  ] = React.useState(false);

  const handleAddToCart = async () => {
    setAddToCartButtonLoading(true);
    if (userId) {
      try {
        const newItem = { id: data.id, quantity: quantity.value, size, color };
        await addToCartMutation({ newItem, userId });
        setAddToCartButtonLoading(false);
        setSideMenuOpen(true);
        setItemInCart(true);
      } catch (error) {
        console.clear();

        console.log(error.response);
        if (error.response.data.message === 'Item founded on the Cart') {
          setItemInCart(true);
        }
        setAddToCartButtonLoading(false);
      }
    } else {
    }
  };
  const handleAddToWishList = async () => {
    setAddToWishListButtonLoading(true);
    try {
      await addToWishListMutation({ id: data.id, userId });
      setAddToWishListButtonLoading(false);
      setItemInWishList(true);
    } catch (error) {
      console.clear();
      if (error.response.data.message === 'Item founded on the Wishlist') {
        setItemInWishList(true);
      }
      setAddToWishListButtonLoading(false);
      console.log(error.response);
    }
  };

  return (
    <Layout>
      <Helmet>
        {/* <title>{` Shop ${name.split('-').join(' ')} on MRG`} </title>
        <meta
          name="description"
          content={`Shop  ${name.split('-').join(' ')} | MRG`}
        /> */}
      </Helmet>

      <AnimatePresence>
        {sideMenuOpen && (
          <SideCartMenu key="side-cart" setSideMenuOpen={setSideMenuOpen} />
        )}
        {sideMenuOpen && (
          <motion.div
            key="sidecart-bg"
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
          {!isLoading && <Breadcrumbs data={data.categories} />}
          {isLoading && <SingleProductLoader />}
          {!isLoading && (
            <div className="single-product__container-desktop">
              <div className=" ">
                <ImageZoom data={data} selectedVariation={selectedVariation} />
              </div>

              <MiddleSection
                selectedVariation={selectedVariation}
                data={data}
                deliveryCountry={deliveryCountry}
                setColor={setColor}
                color={color}
                setSize={setSize}
                size={size}
                setSelectedVariant={setSelectedVariant}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                reviewsLength={reviews?.length}
                reviewsLoading={reviewsLoading}
                setDetailsTab={setDetailsTab}
              />
              <RightSection
                data={data}
                quantity={quantity}
                setQuantity={setQuantity}
                handleAddToCart={handleAddToCart}
                handleAddToWishList={handleAddToWishList}
                quantityOptions={quantityOptions}
                addToCartButtonLoading={addToCartButtonLoading}
                addToWishListButtonLoading={addToWishListButtonLoading}
                itemInCart={itemInCart}
                itemInWishList={itemInWishList}
                userId={userId}
                isAuthenticated={isAuthenticated}
              />
            </div>
          )}
          <div id="details" className="py-2 mb-2">
            {!isLoading && (
              <AdditionalDetails
                data={
                  data.type === 'simple'
                    ? data.simple_addons
                    : data.variation_addons
                }
                reviews={reviews}
                reviewsLoading={reviewsLoading}
                detailsTab={detailsTab}
                setDetailsTab={setDetailsTab}
              />
            )}
          </div>
          {/* {related && <RelatedItems relatedData={related} />}
          {isFetching && <div>Loading ...</div>}
          <InView
            as="div"
            onChange={(inView, entry) => {
              handleLoadMore(inView);
            }}
          >
            <div></div>
          </InView> */}
        </div>
      </div>
    </Layout>
  );
}
