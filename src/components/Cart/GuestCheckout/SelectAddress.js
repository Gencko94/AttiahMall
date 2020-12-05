import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
import { DataProvider } from '../../../contexts/DataContext';
import { getUserAddresses } from '../../../Queries/Queries';
import GoogleMapsAddress from '../../GoogleMapsAddress';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function SelectAddress({
  handleStepForward,
  address,
  setAddress,
}) {
  const { handleAddLocation } = React.useContext(DataProvider);
  /**
   * Main fetch
   */

  const { isLoading, data, refetch, isError } = useQuery(
    'addresses',
    async () => {
      const res = await getUserAddresses();
      return res;
    },
    { refetchOnWindowFocus: false }
  );
  /**
   * Add Mutation
   */
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
        setAddress(newLocation);
        handleStepForward();
      },
    }
  );
  if (isError) {
    return (
      <div
        className={`rounded-lg overflow-hidden
         shadow-itemsSlider-shallow
           
        `}
        style={{ minHeight: 'calc(100vh - 150px)' }}
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
  if (isLoading)
    return (
      <div
        className="flex h-full justify-center items-center"
        style={{ minHeight: 'calc(100vh - 150px)' }}
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
  return (
    <div className="h-full" style={{ minHeight: 'calc(100vh - 150px)' }}>
      {data.length === 0 && (
        <div className="rounded-sm border">
          <GoogleMapsAddress addMutation={addMutation} />
        </div>
      )}
    </div>
  );
}
