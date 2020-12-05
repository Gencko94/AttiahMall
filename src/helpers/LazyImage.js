import React from 'react';
import LazyLoad from 'react-lazyload';

export default function LazyImage({ src, pb, alt }) {
  return (
    <LazyLoad>
      <div
        style={{
          position: 'relative',
          backgroundColor: '#f7f7fa',
          paddingBottom: pb,
          width: '100%',
        }}
      >
        <div className="absolute top-0 left-0">
          <img src={src} alt={alt} />
        </div>
      </div>
    </LazyLoad>
  );
}
