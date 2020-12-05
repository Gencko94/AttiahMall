import React from 'react';
import useClickAway from '../hooks/useClickAway';
import Hamburger from './MobileNavbar/Hamburger';
import MobileIcons from './MobileNavbar/MobileIcons';
import MobileSearchbar from './MobileNavbar/MobileSearchbar';
import SideMenu from './NavbarComponents/SideMenu';
import { DataProvider } from '../contexts/DataContext';
import NavLogoMobile from './MobileNavbar/NavLogoMobile';
import { AnimatePresence, motion } from 'framer-motion';

export default function MobileNavbar() {
  const { isLightTheme } = React.useContext(DataProvider);
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [sideMenuOpenSecond, setSideMenuSecondOpen] = React.useState(false);
  const [windowScrolled, setWindowScrolled] = React.useState(false);
  const sideMenuRef = React.useRef(null);
  const sideMenuRefSecond = React.useRef(null);
  useClickAway(sideMenuRef, () => {
    if (sideMenuOpen) {
      sideMenuRef.current.classList.add('-translate-x-full');
      setSideMenuOpen(false);
    }
  });
  useClickAway(sideMenuRefSecond, () => {
    if (sideMenuOpenSecond) {
      sideMenuRefSecond.current.classList.add('-translate-x-full');
      setSideMenuSecondOpen(false);
    }
  });

  const toggleSideMenu = () => {
    if (sideMenuOpen) {
      setSideMenuOpen(false);
    } else {
      setSideMenuOpen(true);
    }
  };
  const toggleSideMenuSecond = () => {
    if (sideMenuOpenSecond) {
      setSideMenuSecondOpen(false);
    } else {
      setSideMenuSecondOpen(true);
    }
  };
  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 140) {
        setWindowScrolled(true);
        if (sideMenuOpen) {
          toggleSideMenu();
        }
      } else {
        if (sideMenuOpenSecond) {
          toggleSideMenuSecond();
        }
        setWindowScrolled(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', null);
    };
  });
  return (
    <>
      <div className=" w-full left-0 top-0 z-10 ">
        <nav
          className={` relative   p-2  flex items-center  ${
            isLightTheme
              ? 'bg-second-nav-light text-second-nav-text-light'
              : 'bg-nav-cat-dark text-nav-cat-text-dark'
          }`}
        >
          <Hamburger toggleSideMenu={toggleSideMenu} />
          <NavLogoMobile />
          {/* <button className="mr-2" onClick={() => setLightTheme(!isLightTheme)}>
            Light Theme Toggle
          </button> */}

          <MobileIcons />
          <AnimatePresence>
            {!windowScrolled && sideMenuOpen && (
              <SideMenu
                toggleSideMenu={toggleSideMenu}
                sideMenuRef={sideMenuRef}
                isLightTheme={isLightTheme}
              />
            )}
            {!windowScrolled && sideMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                key={5687452}
                className="bg-gray-900 opacity-25 fixed z-10 top-0 left-0 w-full h-screen"
              ></motion.div>
            )}
          </AnimatePresence>
        </nav>
        <div
          className={`p-2 ${
            isLightTheme
              ? 'bg-second-nav-light text-second-nav-text-light'
              : 'bg-nav-cat-dark text-nav-cat-text-dark'
          }`}
        >
          <MobileSearchbar isLightTheme={isLightTheme} />
        </div>
      </div>

      <AnimatePresence>
        {windowScrolled && (
          <motion.div
            key={65789}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              type: 'tween',
            }}
            className={`fixed w-full flex   ${
              isLightTheme
                ? 'bg-second-nav-light text-second-nav-text-light'
                : 'bg-nav-cat-dark text-nav-cat-text-dark'
            } p-2  z-10 top-0 left-0 `}
          >
            <Hamburger toggleSideMenu={toggleSideMenuSecond} />
            <div className="mx-2 flex-1">
              <MobileSearchbar isLightTheme={isLightTheme} />
            </div>

            <MobileIcons withoutLanguage={true} withoutFlag={true} />

            {windowScrolled && sideMenuOpenSecond && (
              <SideMenu
                toggleSideMenu={toggleSideMenuSecond}
                sideMenuRef={sideMenuRefSecond}
                isLightTheme={isLightTheme}
              />
            )}
            {windowScrolled && sideMenuOpenSecond && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.25 }}
                exit={{ opacity: 0 }}
                key={5687452}
                className="bg-gray-900 opacity-25 fixed z-10 top-0 left-0 w-full h-screen"
              ></motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
