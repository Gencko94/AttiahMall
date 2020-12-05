import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import { queryCache, useMutation, useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';
import NoAddresses from '../MyAccount/MyAddresses/NoAddresses';
import GoogleMapsAddress from '../GoogleMapsAddress';
import LocationsMobile from './MyAddressesMobile/LocationsMobile';
import { motion } from 'framer-motion';
export default function MyAddressesMobile() {
  const [showMap, setShowMap] = React.useState(false);
  const {
    getUserLocations,
    handleAddLocation,
    handleRemoveLocation,
    isLightTheme,
  } = React.useContext(DataProvider);
  const { isLoading, data, refetch, isError } = useQuery(
    'addresses',
    async () => {
      const res = await getUserLocations();
      return res.locations;
    },
    { refetchOnWindowFocus: false }
  );

  /* Add Mutation */
  const [addMutation] = useMutation(
    async location => {
      const res = await handleAddLocation(location);
      if (res.message === 'ok') {
        return res.newLocation;
      }
    },
    {
      onSuccess: newLocation => {
        queryCache.setQueryData('addresses', prev => {
          return [...prev, newLocation];
        });
        refetch();

        setShowMap(false);
      },
    }
  );

  /* Delete Mutation */
  const [deleteMutation] = useMutation(
    async location => {
      const res = await handleRemoveLocation(location);
      if (res.message === 'ok') {
        return res.locations;
      }
    },
    {
      onSuccess: locations => {
        queryCache.setQueryData('addresses', () => {
          return locations;
        });
        refetch();

        setShowMap(false);
      },
    }
  );
  if (isError) {
    return (
      <div div className=" p-4 " style={{ height: 'calc(-173px + 100vh)' }}>
        <div className="flex h-full justify-center items-center font-semibold">
          <h1>Oops, Something Went Wrong</h1>
          <button className="bg-gray-300 rounded px-2 py-1" onClick={refetch}>
            Try Again
          </button>
        </div>
      </div>
    );
  }
  if (isLoading)
    return (
      <div className=" p-4 " style={{ height: 'calc(-173px + 100vh)' }}>
        <div className="flex h-full justify-center items-center">
          <BeatLoader size={10} color={'#b72b2b'} />
        </div>
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
      className="h-full"
    >
      {!isLoading &&
        !showMap &&
        (data.length === 0 ? (
          <NoAddresses isLightTheme={isLightTheme} setShowMap={setShowMap} />
        ) : (
          <LocationsMobile
            locations={data}
            setShowMap={setShowMap}
            deleteMutation={deleteMutation}
          />
        ))}
      {showMap && (
        <div className="relative" style={{ minHeight: 'calc(-173px + 100vh)' }}>
          <GoogleMapsAddress addMutation={addMutation} />
        </div>
      )}
    </motion.div>
  );
}
