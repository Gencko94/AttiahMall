import React from 'react';

import NavCategory from './NavbarComponents/NavCategory';

import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import FirstNav from './NavbarComponents/FirstNav';
import SecondNav from './NavbarComponents/SecondNav';
export default function Navbar() {
  const hideAllCategories = useMediaQuery({ query: '(min-width:1040px)' });
  const { pathname } = useLocation();
  const specialPages =
    pathname.includes('/user/account') ||
    pathname.includes('/guest-checkout') ||
    pathname.includes('/checkout');

  return (
    <>
      {!specialPages && <FirstNav />}

      <SecondNav />

      {!specialPages && hideAllCategories && <NavCategory />}
    </>
  );
}
