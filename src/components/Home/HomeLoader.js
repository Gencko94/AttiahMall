import React from 'react';
import ContentLoader from 'react-content-loader';

export default function HomeLoader({ height }) {
  return (
    <div style={{ height: height }}>
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} className="px-2 my-4">
          <ContentLoader
            speed={2}
            viewBox="0 0 400 560"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            key={i}
            // rtl={locale === 'ar'}
          >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="370" />
            <rect x="0" y="400" rx="5" ry="5" width="100%" height="30" />
            <rect x="0" y="450" rx="5" ry="5" width="50%" height="30" />
            <rect x="0" y="500" rx="5" ry="5" width="100%" height="50" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
}
