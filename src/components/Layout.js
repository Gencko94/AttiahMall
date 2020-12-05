import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Footer from './Footer';
import MobileFooter from './MobileFooter';
import MobileNavbar from './MobileNavbar';
import Navbar from './Navbar';

export default function Layout({ children }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      {isTabletOrAbove ? <Navbar /> : <MobileNavbar />}
      {children}
      {isTabletOrAbove ? <Footer /> : <MobileFooter />}
    </>
  );
}
