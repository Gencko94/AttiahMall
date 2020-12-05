import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import CategoryChildren from './CategoryChildren';

export default function CategoryHeader({ categoryInfo, categoryInfoLoading }) {
  const { locale } = useIntl();
  if (categoryInfoLoading) {
    return (
      <ContentLoader
        speed={4}
        viewBox="0 0 1440 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="300" />
      </ContentLoader>
    );
  }
  return (
    <div>
      <div
        className="h-64 flex items-center justify-center text-6xl"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/small/${categoryInfo.image.link})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {categoryInfo.translation[locale].name}
      </div>
      {categoryInfo.children.length !== 0 && (
        <CategoryChildren
          categoryInfo={categoryInfo}
          categoryInfoLoading={categoryInfoLoading}
        />
      )}
    </div>
  );
}
