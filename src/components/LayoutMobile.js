import React from 'react';
import MobileFooter from './MobileFooter';
import MobileNavbar from './MobileNavbar';

export default function LayoutMobile({ children }) {
  return (
    <>
      <MobileNavbar />
      {children}
      <MobileFooter />
    </>
  );
}
