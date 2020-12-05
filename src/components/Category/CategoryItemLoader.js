import React from 'react';
import ContentLoader from 'react-content-loader';

export default function CategoryItemLoader() {
  return (
    <div>
      <ContentLoader
        speed={4}
        viewBox="0 0 210 371"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="5" ry="5" width="100%" height="371" />
      </ContentLoader>
    </div>
  );
}
