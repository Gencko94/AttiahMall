import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { queryCache, useMutation, useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LayoutMobile from '../components/LayoutMobile';
import NoViewedItems from '../components/ViewedItems/NoViewedItems';
import ViewedItemMobile from '../components/ViewedItems/ViewedItemMobile';
import { DataProvider } from '../contexts/DataContext';

export default function ViewedItemsMobile() {
  const { formatMessage } = useIntl();
  const { getViewedItems, removeViewedItem } = React.useContext(DataProvider);
  const [removeButtonLoading, setRemoveButtonLoading] = React.useState(null);

  /**
   * Main Fetch
   */
  const { data, isLoading } = useQuery('viewedItems', async () => {
    return await getViewedItems();
  });
  /**
   * Delete Mutation
   */
  const [deleteMutation] = useMutation(
    async id => {
      setRemoveButtonLoading(id);
      return await removeViewedItem(id);
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('viewedItems', prev => {
          const visitedItems = prev.visitedItems.filter(i => i.id !== data.id);

          return {
            ...prev,
            visitedItems,
          };
        });
        setRemoveButtonLoading(null);
      },
    }
  );

  const handleRemoveItem = async id => {
    try {
      await deleteMutation(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutMobile>
      <Helmet>
        <title>Viewed Items | MRG</title>
      </Helmet>

      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={isLoading}
          />
        </div>
      )}
      {!isLoading && (
        <div className=" p-2 min-h-screen">
          <h1 className=" text-xl font-semibold">
            {formatMessage({ id: 'your-viewed-items' })}
          </h1>
          <hr className="my-2" />
          <AnimateSharedLayout>
            <motion.div layout className="viewed-items-grid__mobile">
              <AnimatePresence>
                {data.visitedItems.length !== 0 &&
                  data.visitedItems.map(item => {
                    return (
                      <ViewedItemMobile
                        key={item.id}
                        item={item}
                        handleRemoveItem={handleRemoveItem}
                        removeButtonLoading={removeButtonLoading}
                      />
                    );
                  })}
                {data.visitedItems.length === 0 && (
                  <NoViewedItems key={'No Viewed Items'} />
                )}
              </AnimatePresence>
            </motion.div>
          </AnimateSharedLayout>
        </div>
      )}
    </LayoutMobile>
  );
}
