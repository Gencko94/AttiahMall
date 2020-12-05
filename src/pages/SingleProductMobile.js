import React from 'react';

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DataProvider } from '../contexts/DataContext';
import InView, { useInView } from 'react-intersection-observer';
import RelatedItems from '../components/SingleProduct/RelatedItems';
import { Helmet } from 'react-helmet';
import { useLazyLoadFetch } from '../hooks/useLazyLoadFetch';
import LayoutMobile from '../components/LayoutMobile';
import ImageZoomMobile from '../components/SingleProductMobile/ImageZoomMobile';
import ItemDescription from '../components/SingleProductMobile/ItemDescription';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
import FloatingAddToCart from '../components/SingleProductMobile/FloatingAddToCart';
import { queryCache, useMutation, useQuery } from 'react-query';
import { AnimatePresence, motion } from 'framer-motion';
import SingleProductMobileLoader from '../components/SingleProductMobile/SingleProductMobileLoader';
import AdditionalDetailsMobile from '../components/SingleProductMobile/AdditionalDetailsMobile';

export default function SingleProductMobile({
  match: {
    params: { id, name },
  },
}) {
  const {
    addItemToCart,

    removeItemFromCart,
    deliveryCountry,
    getSingleItemDetails,
    allItems,
  } = React.useContext(DataProvider);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery(
    ['singleProductMobile', id],
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
        queryCache.setQueryData(['singleProductMobile', id], prev => {
          console.log(data.cartTotal);
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
        queryCache.setQueryData(['singleProductMobile', id], prev => {
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

  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [isFetching, setFetching] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [relatedData, hasMore] = useLazyLoadFetch(allItems, page);
  const [related, setRelated] = React.useState(null);
  const [addToCartButtonLoading, setAddToCartButtonLoading] = React.useState(
    false
  );
  const [quantity, setQuantity] = React.useState(1);
  const [size, setSize] = React.useState(null);
  const [color, setColor] = React.useState(null);
  const [detailsTab, setDetailsTab] = React.useState(0);

  const [triggerRef, inView] = useInView();

  const handleSubstractQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleLoadMore = inView => {
    if (inView) {
      if (hasMore) {
        setFetching(true);
        setPage(page + 1);
      }
    }
  };
  const fetchData = () => {
    setTimeout(() => {
      setRelated(relatedData);

      setFetching(false);
    }, 2000);
  };

  const handleAddToCart = async ({ id, quantity }) => {
    try {
      await addToCartMutation({
        id,
        quantity: quantity.value,
        price: data.item.price,
        name: data.item.name,
        photo: data.item.photos.small,
        category: data.item.category,
        color,
        size,
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
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <LayoutMobile>
      <Helmet>
        <title>{` Shop ${name.split('-').join(' ')} on AttiahMall`} </title>
        <meta
          name="description"
          content={`${name.split('-').join(' ')} | AttiahMall`}
        />
      </Helmet>
      <div className="overflow-hidden">
        <AnimatePresence>
          {sideMenuOpen && (
            <SideCartMenuMobile
              key={998}
              cartItems={data.cartItems}
              cartTotal={data.cartTotal}
              setSideMenuOpen={setSideMenuOpen}
              handleRemoveFromCart={handleRemoveFromCart}
            />
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
            <ImageZoomMobile
              data={{ images: data.item.photos.main, name: data.item.name }}
            />

            <hr />
            <div className="flex flex-col w-full  px-3 py-2 bg-white">
              <ItemDescription
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                deliveryCountry={deliveryCountry}
                data={{
                  price: data.item.price,
                  priceBefore: data.item.priceBefore,
                  name: data.item.name,
                  id: data.item.id,
                  colors: data.item.colors,
                  availableColors: data.item.availableColors,
                  sizes: data.item.sizes,
                  availableSizes: data.item.availableSizes,
                }}
                itemInCart={data.itemInCart}
                addToCartButtonLoading={addToCartButtonLoading}
                quantity={quantity}
                setQuantity={setQuantity}
                size={size}
                setSize={setSize}
                color={color}
                setColor={setColor}
                reviews={data.item.reviews}
                rating={data.item.rating}
                setDetailsTab={setDetailsTab}
              />

              <hr />
            </div>
          </div>
        )}
        {!isLoading && (
          <AdditionalDetailsMobile
            data={data.item}
            detailsTab={detailsTab}
            setDetailsTab={setDetailsTab}
          />
        )}

        {!isLoading && (
          <FloatingAddToCart
            handleSubstractQuantity={handleSubstractQuantity}
            quantity={quantity}
            handleAddQuantity={handleAddQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddToCart={handleAddToCart}
            id={data.item.id}
            price={data.item.price}
            addToCartButtonLoading={addToCartButtonLoading}
            inView={inView}
            itemInCart={data.itemInCart}
          />
        )}

        <hr />
        <div ref={triggerRef}>
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
    </LayoutMobile>
  );
}
