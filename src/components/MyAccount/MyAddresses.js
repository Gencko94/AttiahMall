import React from 'react';
import { BeatLoader } from 'react-spinners';
import { DataProvider } from '../../contexts/DataContext';
import GoogleMapsAddress from '../GoogleMapsAddress';
import Locations from './MyAddresses/Locations';
import NoAddresses from './MyAddresses/NoAddresses';
import { useQuery, useMutation, queryCache } from 'react-query';
import { motion } from 'framer-motion';

export default function MyAddresses() {
  const [showMap, setShowMap] = React.useState(false);
  const {
    getUserLocations,
    handleAddLocation,
    handleRemoveLocation,
    isLightTheme,
  } = React.useContext(DataProvider);

  /* Main Fetching */
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
      <div
        className={`rounded-lg overflow-hidden ${
          isLightTheme
            ? 'shadow-itemsSlider-shallow'
            : 'shadow-itemsSlider-wide'
        }`}
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
        <BeatLoader size={10} color={'#b72b2b'} />
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
      {!isLoading &&
        !showMap &&
        (data.length === 0 ? (
          <NoAddresses isLightTheme={isLightTheme} setShowMap={setShowMap} />
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
