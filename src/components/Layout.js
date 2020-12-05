import React from 'react';
import { useMediaQuery } from 'react-responsive';

import Desktop from './Layouts/Desktop';
import Mobile from './Layouts/Mobile';

export default function Layout({ children }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <>
      {isTabletOrAbove ? (
        <Desktop children={children} />
      ) : (
        <Mobile children={children} />
      )}
    </>
  );
}
