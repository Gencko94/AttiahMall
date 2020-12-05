import React from 'react';
import { useIntl } from 'react-intl';
import ItemDescription from '../SingleProduct/AdditionalDetails/ItemDescription';
import ItemReviews from '../SingleProduct/AdditionalDetails/ItemReviews';

export default function AdditionalDetailsMobile({
  detailsTab,
  setDetailsTab,
  reviewsLoading,
  reviews,
}) {
  const { formatMessage } = useIntl();
  return (
    <div className="py-2">
      <div className="flex justify-center mb-2">
        <button
          onClick={() => setDetailsTab(0)}
          className={`text-lg py-2 flex-1 text-center   ${
            detailsTab === 0 && 'bg-main-color  text-main-text'
          }   bg-gray-400`}
        >
          {formatMessage({ id: 'additional-details__item-description' })}
        </button>

        <button
          id="details"
          onClick={() => setDetailsTab(1)}
          className={`text-lg py-2 flex-1 text-center   ${
            detailsTab === 1 && 'bg-main-color  text-main-text'
          }   bg-gray-400`}
        >
          {formatMessage({ id: 'additional-details__item-reviews' })}
        </button>
      </div>
      <div className="px-3 text-sm">
        {detailsTab === 0 && <ItemDescription />}
        {detailsTab === 1 && (
          <ItemReviews reviews={reviews} reviewsLoading={reviewsLoading} />
        )}
      </div>
    </div>
  );
}
