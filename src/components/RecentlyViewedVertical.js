import React from 'react';
import ContentLoader from 'react-content-loader';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import MultiClamp from 'react-multi-clamp';
import { useQuery } from 'react-query';
import Rating from 'react-rating';
import { DataProvider } from '../contexts/DataContext';

export default function RecentlyViewedVertical({ visitedItems }) {
  const { getRecentlyViewedVertical } = React.useContext(DataProvider);
  const { formatMessage, locale } = useIntl();
  const { data, isLoading } = useQuery('recentlyViewedVertical', async () => {
    return await getRecentlyViewedVertical(visitedItems);
  });

  if (isLoading) {
    return (
      <div className="border rounded p-2 bg-gray-100">
        <ContentLoader
          speed={3}
          viewBox="0 0 400 680"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          rtl={locale === 'ar'}
          style={{ alignSelf: 'flex-start' }}
        >
          <rect x="0" y="0" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="0" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="40" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="80" rx="5" ry="5" width="100%" height="38" />

          <rect x="0" y="140" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="140" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="180" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="220" rx="5" ry="5" width="100%" height="38" />

          <rect x="0" y="280" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="280" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="320" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="360" rx="5" ry="5" width="100%" height="38" />
          <rect x="0" y="420" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="420" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="460" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="500" rx="5" ry="5" width="100%" height="38" />

          <rect x="0" y="560" rx="5" ry="5" width="30%" height="120" />
          <rect x="32%" y="560" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="600" rx="5" ry="5" width="100%" height="35" />
          <rect x="32%" y="640" rx="5" ry="5" width="100%" height="38" />
        </ContentLoader>
      </div>
    );
  }
  return (
    <div className="border rounded p-2 bg-gray-100">
      <h1 className="mb-1">
        {formatMessage({ id: 'your-recently-visited-items' })}
      </h1>
      <hr />
      {data.map(item => {
        return (
          <div key={item.id} className="recent-items__container mb-2 ">
            <a
              title={item.name}
              className="hover:underline"
              href={`/${locale}/${item.category.replace(
                /\s|%|,/g,
                '-'
              )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
            >
              <img src={item.photos.small} alt={item.name} />
            </a>
            <div className="text-sm">
              <a
                title={item.name}
                className="hover:underline"
                href={`/${locale}/${item.category.replace(
                  /\s|%|,/g,
                  '-'
                )}/${item.name.replace(/\s|%|,|-/g, '-')}/${item.id}`}
              >
                <MultiClamp
                  className="text-sm  font-semibold"
                  clamp={2}
                  ellipsis="..."
                >
                  {item.name}
                </MultiClamp>
              </a>
              <Rating
                initialRating={Math.round(Math.random() * 5)}
                emptySymbol={<AiOutlineStar className="text-red-700" />}
                fullSymbol={<AiFillStar className="text-red-700" />}
                className="mr-2 pt-1"
              />
              <h1 className="text-green-700">{item.price} KD</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}
