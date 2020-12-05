import React from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';

export default function SingleProductLoader() {
  const { locale } = useIntl();
  return (
    <div className="single-product__container-desktop">
      <div>
        <ContentLoader
          speed={2}
          viewBox="0 0 480 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          rtl={locale === 'ar'}
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
        </ContentLoader>
      </div>

      <div>
        <ContentLoader
          speed={2}
          viewBox="0 0 550 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          rtl={locale === 'ar'}
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="40" rx="5" ry="5" width="80%" height="25" />
          <rect x="0" y="80" rx="5" ry="5" width="60%" height="25" />
          <rect x="0" y="120" rx="5" ry="5" width="40%" height="25" />
          <rect x="0" y="160" rx="5" ry="5" width="20%" height="25" />
          <rect x="0" y="200" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="220" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="260" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="300" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="340" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="360" rx="5" ry="5" width="100%" height="120" />
        </ContentLoader>
      </div>
      <div>
        <ContentLoader
          speed={2}
          viewBox="0 0 295 480"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          rtl={locale === 'ar'}
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="40" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="75" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="85" rx="5" ry="5" width="80%" height="25" />
          <rect x="0" y="125" rx="5" ry="5" width="60%" height="25" />
          <rect x="0" y="165" rx="5" ry="5" width="60%" height="25" />
          <rect x="0" y="200" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="210" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="245" rx="5" ry="5" width="100%" height="1" />
          <rect x="0" y="255" rx="5" ry="5" width="75%" height="25" />
          <rect x="0" y="295" rx="5" ry="5" width="100%" height="25" />
          <rect x="0" y="335" rx="5" ry="5" width="100%" height="25" />
        </ContentLoader>
      </div>
    </div>
  );
}
