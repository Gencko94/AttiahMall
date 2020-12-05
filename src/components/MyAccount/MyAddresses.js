import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Locations from './MyAddresses/Locations';
import NoAddresses from './MyAddresses/NoAddresses';
import { useQuery, useMutation, queryCache } from 'react-query';
import { motion } from 'framer-motion';
import {
  addUserAddress,
  getUserAddresses,
  removeUserAddress,
} from '../../Queries/Queries';

export default function MyAddresses() {
  const [showMap, setShowMap] = React.useState(false);

  /* Main Fetching */
  const { isLoading, data, refetch, isError } = useQuery(
    'addresses',
    getUserAddresses,
    { refetchOnWindowFocus: false, retry: true }
  );

  /* Add Mutation */
  const [addMutation] = useMutation(
    addUserAddress,

    {
      onSuccess: data => {
        console.log('success');
        queryCache.setQueryData('addresses', () => {
          return data;
        });
        refetch();

        setShowMap(false);
      },
      throwOnError: true,
    }
  );

  /* Delete Mutation */
  const [deleteMutation] = useMutation(removeUserAddress, {
    onSuccess: id => {
      queryCache.setQueryData('addresses', prev => {
        return prev.map(item => item.id !== id);
      });
      refetch();

      setShowMap(false);
    },
    throwOnError: true,
  });

  if (isError) {
    return (
      <div
        className={`rounded-lg overflow-hidden 
       
          shadow-itemsSlider-shallow
            
        `}
      >
        <div className="flex h-full justify-center items-center font-semibold">
          <h1>Oops, Something Went Wrong</h1>
          <button className="bg-gray-300 rounded px-2 py-1" onClick={refetch}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };
  if (isLoading)
    return (
      <div className="flex h-full justify-center items-center">
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={isLoading}
        />
      </div>
    );
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full"
    >
      {!showMap &&
        (data.length === 0 ? (
          <NoAddresses setShowMap={setShowMap} />
        ) : (
          <Locations
            locations={data}
            setShowMap={setShowMap}
            deleteMutation={deleteMutation}
          />
        ))}
      {showMap && (
        <div className="relative h-full">
          <GoogleMapsAddress addMutation={addMutation} />
        </div>
      )}
    </motion.div>
  );
}
