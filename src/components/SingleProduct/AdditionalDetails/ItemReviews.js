import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import Rating from 'react-rating';
import moment from 'moment';
import 'moment/locale/ar';

export default function ItemReviews({ reviews, rating }) {
  const { formatMessage, locale } = useIntl();
  moment.locale(locale);
  const resolvePlural = () => {
    switch (reviews.length) {
      case 1:
        return formatMessage({ id: 'one-review' });

      case 2:
        return formatMessage({ id: 'two-reviews' });

      case reviews.length > 10:
        return formatMessage({ id: 'one-review' });

      default:
        return formatMessage({ id: 'reviews' });
    }
  };
  return (
    <div>
      <div className="flex items-center mb-2">
        <h1 className="font-semibold text-xl">
          {formatMessage({ id: 'single-product-product-review' })}:
        </h1>
        <div className="mx-2">
          <Rating
            initialRating={rating}
            readonly
            emptySymbol={<AiOutlineStar className="text-gold h-6 w-6" />}
            fullSymbol={<AiFillStar className="text-gold h-6 w-6" />}
            className=" pt-1"
          />
        </div>
        <div className="text-sm text-gray-600 flex items-center">
          <h1>{reviews.length > 2 && reviews.length}</h1>
          <h1 className="mx-1">{resolvePlural()}</h1>
        </div>
      </div>

      {reviews.length !== 0 && (
        <div className="grid grid-cols-1 gap-2 p-3 bg-gray-100 rounded">
          {reviews.map((review, i) => {
            return (
              <div key={review.id}>
                <div>
                  <h1 className="font-semibold">{review.author}</h1>
                </div>
                <div className="flex items-center">
                  <Rating
                    initialRating={review.rating}
                    readonly
                    emptySymbol={<AiOutlineStar className="text-main-color" />}
                    fullSymbol={<AiFillStar className="text-main-color" />}
                    className=" pt-1"
                  />

                  <h1 className="text-gray-600 text-sm mx-1">
                    {moment(review.date, 'DD-MM-YYYY').fromNow()}
                  </h1>
                </div>
                <div className="mb-2">
                  <p className="">{review.body}</p>
                </div>
                {i !== reviews.length - 1 && <hr className="mt-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
