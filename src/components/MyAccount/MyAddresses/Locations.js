import React from 'react';
import { useIntl } from 'react-intl';
import Location from './Location';
import { AiOutlinePlus } from 'react-icons/ai';
import { AnimatePresence } from 'framer-motion';

export default function Locations({ locations, setShowMap, deleteMutation }) {
  const { formatMessage } = useIntl();
  const [deleteButtonLoading, setDeleteButtonLoading] = React.useState(null);
  const handleRemoveLocation = async location => {
    try {
      setDeleteButtonLoading(location.lat);
      await deleteMutation(location);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full">
      <div className="flex p-3 items-center justify-between bg-main-color text-main-text">
        <h1 className="text-lg">{formatMessage({ id: 'my-addresses' })}</h1>
        <button onClick={() => setShowMap(true)}>
          <AiOutlinePlus className="h-6 w-6" />
        </button>
      </div>
      <div className="p-3 locations-grid__desktop">
        <AnimatePresence>
          {locations.map(location => {
            return (
              <Location
                key={location.lat}
                data={location}
                handleRemoveLocation={handleRemoveLocation}
                deleteButtonLoading={deleteButtonLoading}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
