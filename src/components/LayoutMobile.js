import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import useClickAway from '../hooks/useClickAway';
import MobileFooter from './MobileFooter';
import MobileNavbar from './MobileNavbar';
import SideMenu from './NavbarComponents/SideMenu';

export default function LayoutMobile({ children }) {
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const sideMenuRef = React.useRef(null);
  const toggleSideMenu = () => {
    if (sideMenuOpen) {
      setSideMenuOpen(false);
    } else {
      setSideMenuOpen(true);
    }
  };
  useClickAway(sideMenuRef, () => {
    if (sideMenuOpen) {
      sideMenuRef.current.classList.add('-translate-x-full');
      setSideMenuOpen(false);
    }
  });
  return (
    <>
      <MobileNavbar
        sideMenuOpen={sideMenuOpen}
        setSideMenuOpen={setSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
      />
      {children}
      <AnimatePresence>
        {sideMenuOpen && (
          <SideMenu toggleSideMenu={toggleSideMenu} sideMenuRef={sideMenuRef} />
        )}
        {sideMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            key={5687452}
            className="bg-gray-900 opacity-25 fixed z-10 top-0 left-0 w-full h-screen"
          ></motion.div>
        )}
      </AnimatePresence>
      <MobileFooter />
    </>
  );
}
