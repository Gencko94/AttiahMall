import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { queryCache, useMutation, useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';
import Layout from '../components/Layout';
import { DataProvider } from '../contexts/DataContext';
import ViewedItem from '../components/ViewedItems/ViewedItem';
import NoViewedItems from '../components/ViewedItems/NoViewedItems';
import FeaturedItemsVertical from '../components/Cart/FeaturedItemsVertical';
export default function ViewedItems() {
  const { getViewedItems, removeViewedItem } = React.useContext(DataProvider);
  const [removeButtonLoading, setRemoveButtonLoading] = React.useState(null);
  const { formatMessage } = useIntl();
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
    <Layout>
      <Helmet>
        <title>Viewed Items | AttiahMall</title>
      </Helmet>
      {isLoading && (
        <div className="min-h-screen px-4 py-2 flex items-center justify-center">
          <BeatLoader size={15} color={'#b72b2b'} />
        </div>
      )}
      {!isLoading && (
        <div className="px-4 py-2 min-h-screen">
          <h1 className=" text-xl font-semibold">
            {formatMessage({ id: 'your-viewed-items' })}
          </h1>
          <hr className="my-2" />
          <div className="viewed-items-grid__desktop">
            <AnimateSharedLayout>
              <motion.div layout>
                <AnimatePresence>
                  {data.visitedItems.length !== 0 &&
                    data.visitedItems.map(item => {
                      return (
                        <ViewedItem
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
            <div>
              <FeaturedItemsVertical />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
