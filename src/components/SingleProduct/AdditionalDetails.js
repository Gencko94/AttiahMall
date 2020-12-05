import React from 'react';
import { useIntl } from 'react-intl';
import ItemDescription from './AdditionalDetails/ItemDescription';
import ItemReviews from './AdditionalDetails/ItemReviews';

export default function AdditionalDetails({ data }) {
  const { formatMessage } = useIntl();
  const [detailsTab, setDetailsTab] = React.useState(0);
  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">
        {formatMessage({ id: 'single-product-additional-details' })}
      </h1>
      <div className="flex justify-center rounded overflow-hidden">
        <button
          onClick={() => setDetailsTab(0)}
          className={`text-lg py-2 flex-1 text-center   ${
            detailsTab === 0 && 'bg-main-color  text-main-text'
          }   bg-gray-400`}
        >
          {formatMessage({ id: 'additional-details__item-description' })}
        </button>

        <button
          onClick={() => setDetailsTab(1)}
          className={`text-lg py-2 flex-1 text-center   ${
            detailsTab === 1 && 'bg-main-color  text-main-text'
          }   bg-gray-400`}
        >
          {formatMessage({ id: 'additional-details__item-reviews' })}
        </button>
      </div>
      <div className="py-2">
        {detailsTab === 0 && <ItemDescription description={data.description} />}

        {detailsTab === 1 && (
          <ItemReviews reviews={data.reviews} rating={data.rating} />
        )}
      </div>
    </div>
  );
}
