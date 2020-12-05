import React from 'react';
import ContentLoader from 'react-content-loader';

export default function CartContainerLoader({ locale }) {
  return (
    <ContentLoader
      speed={3}
      viewBox="0 0 400 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      rtl={locale === 'ar'}
      style={{ alignSelf: 'flex-start' }}
    >
      <rect x="0" y="0" rx="1" ry="1" width="22%" height="56" />
      <rect x="23%" y="0" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="20px" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="40px" rx="1" ry="1" width="77%" height="16" />
      <rect x="0" y="65" rx="1" ry="1" width="22%" height="56" />
      <rect x="23%" y="65" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="85" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="105" rx="1" ry="1" width="77%" height="16" />
      <rect x="0" y="130" rx="1" ry="1" width="22%" height="56" />
      <rect x="23%" y="130" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="150" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="170" rx="1" ry="1" width="77%" height="16" />
      <rect x="0" y="195" rx="1" ry="1" width="22%" height="56" />
      <rect x="23%" y="195" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="215" rx="1" ry="1" width="77%" height="16" />
      <rect x="23%" y="235" rx="1" ry="1" width="77%" height="16" />
    </ContentLoader>
  );
}
