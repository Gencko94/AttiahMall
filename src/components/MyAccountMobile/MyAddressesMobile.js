import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import NoAddresses from '../MyAccount/MyAddresses/NoAddresses';
import GoogleMapsAddress from '../GoogleMapsAddress';
import LocationsMobile from './MyAddressesMobile/LocationsMobile';
import { motion } from 'framer-motion';
import {
  addUserAddress,
  getUserAddresses,
  removeUserAddress,
} from '../../Queries/Queries';
export default function MyAddressesMobile() {
  const [showMap, setShowMap] = React.useState(false);

  const { isLoading, data, refetch, isError } = useQuery(
    'addresses',
    async () => {
      const res = await getUserAddresses();
      return res;
    },
    { refetchOnWindowFocus: false }
  );

  const [addMutation] = useMutation(
    addUserAddress,

    {
      onSuccess: newAddress => {
        console.log('success');
        queryCache.setQueryData('addresses', prev => {
          return [...prev, newAddress];
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
        div
        className=" p-4 flex items-center justify-center font-semibold"
        style={{ minHeight: 'calc(-173px + 100vh)' }}
      >
        <h1>Oops, Something Went Wrong</h1>
        <button className="bg-gray-300 rounded px-2 py-1" onClick={refetch}>
          Try Again
        </button>
      </div>
    );
  }
  if (isLoading)
    return (
      <div
        className=" p-4 flex justify-center items-center "
        style={{ minHeight: 'calc(-173px + 100vh)' }}
      >
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={isLoading}
        />
      </div>
    );
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {!showMap &&
        (data.length === 0 ? (
          <NoAddresses setShowMap={setShowMap} />
        ) : (
          <LocationsMobile
            locations={data}
            setShowMap={setShowMap}
            deleteMutation={deleteMutation}
          />
        ))}
      {showMap && (
        <div className="relative" style={{ minHeight: 'calc(-176px + 100vh)' }}>
          <GoogleMapsAddress addMutation={addMutation} />
        </div>
      )}
    </motion.div>
  );
}
