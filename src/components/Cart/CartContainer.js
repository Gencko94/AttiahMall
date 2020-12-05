import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import CartContainerLoader from './loaders/CartContainerLoader';

export default function CartContainer({
  isLoading,
  data,
  removefromCartButtonLoading,
  handleRemoveItemFromCart,
  handleAddItemToWishlist,
  handleRemoveItemFromWishlist,
  addToWishListButtonLoading,
}) {
  const resolvePlural = () => {
    switch (data.cartItems.length) {
      case 1:
        return formatMessage({ id: 'one-item' });

      case 2:
        return formatMessage({ id: 'two-items' });

      case data.cartItems.length > 10:
        return formatMessage({ id: 'one-items' });
      default:
        return formatMessage({ id: 'multiple-items' });
    }
  };
  const { formatMessage, locale } = useIntl();
  if (isLoading) {
    return <CartContainerLoader locale={locale} />;
  }
  return (
    <div className="">
      <AnimatePresence>
        {data.cartItems.length === 0 && <CartEmpty />}
      </AnimatePresence>
      {data.cartItems.length !== 0 && (
        <>
          <div className="cart-grid-titles font-semibold text-lg">
            <div></div>
            {/* <h1 className="  ">{formatMessage({ id: 'shopping-cart' })}</h1> */}
            <h1 className="  ">{formatMessage({ id: 'the-item' })}</h1>
            <h1 className="text-center">{formatMessage({ id: 'price' })}</h1>
          </div>
          <hr />
          <AnimateSharedLayout>
            <motion.div
              initial={false}
              layout
              className=" grid grid-cols-1 gap-2"
            >
              <AnimatePresence>
                {data.cartItems.map(item => {
                  return (
                    <CartItem
                      key={item.id}
                      item={item}
                      handleRemoveItemFromCart={handleRemoveItemFromCart}
                      removefromCartButtonLoading={removefromCartButtonLoading}
                      handleRemoveItemFromWishlist={
                        handleRemoveItemFromWishlist
                      }
                      handleAddItemToWishlist={handleAddItemToWishlist}
                      addToWishListButtonLoading={addToWishListButtonLoading}
                    />
                  );
                })}
              </AnimatePresence>
            </motion.div>

            <motion.div
              layout
              className="flex justify-end p-2 rounded mt-2 border bg-gray-100"
            >
              <h1>{formatMessage({ id: 'cart-total' })}</h1>
              <h1 className="mx-1 whitespace-no-wrap ">
                (
                {locale === 'ar'
                  ? data.cartItems.length > 2 && data.cartItems.length
                  : `${data.cartItems.length} `}
                {resolvePlural()})
              </h1>
              <h1>{data.cartTotal}</h1> KD
            </motion.div>
            <motion.div layout className="text-sm my-4">
              <h1>{formatMessage({ id: 'cart-tos' })}</h1>
            </motion.div>
          </AnimateSharedLayout>
        </>
      )}

      <hr />
      {/* {visitedItems.length > 7 ? (
            <RecentlyVisitedHorizontal visitedItems={visitedItems} />
          ) : (
            <ItemsSlider
              data={phone}
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Save Big with Phones & Tablets"
            />
          )} */}
    </div>
  );
}
