import React from 'react';
import { useMediaQuery } from 'react-responsive';
import LazyImage from '../../helpers/LazyImage';
export default function Banner({ url }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 668px)' });
  return (
    <LazyImage
      src={`${process.env.REACT_APP_IMAGES_URL}/original/${url}`}
      alt="banner"
      pb={`${
        isTabletOrAbove ? 'calc(100% * 250/1440)' : 'calc(100% * 720/1342)'
      }`}
    />
  );
}
