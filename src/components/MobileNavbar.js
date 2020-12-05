import React from 'react';
import Hamburger from './MobileNavbar/Hamburger';
import MobileIcons from './MobileNavbar/MobileIcons';
import MobileSearchbar from './MobileNavbar/MobileSearchbar';
import NavLogoMobile from './MobileNavbar/NavLogoMobile';
import { AnimatePresence, motion } from 'framer-motion';

export default function MobileNavbar({ toggleSideMenu }) {
  const [windowScrolled, setWindowScrolled] = React.useState(false);

  React.useEffect(() => {
    const checkScrolling = () => {
      if (window.scrollY >= 140) {
        setWindowScrolled(true);
      } else {
        setWindowScrolled(false);
      }
    };
    window.addEventListener('scroll', checkScrolling);
    return () => {
      window.removeEventListener('scroll', checkScrolling);
    };
  });
  return (
    <>
      <div className=" w-full left-0 top-0 z-10 ">
        <nav
          className={` relative p-2  flex items-center bg-main-color text-main-text`}
        >
          <Hamburger toggleSideMenu={toggleSideMenu} />
          <NavLogoMobile />

          <MobileIcons />
        </nav>
        <div
          className={`p-2 
         
              bg-main-color text-main-text
        
          `}
        >
          <MobileSearchbar />
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
            className={`fixed w-full flex  
              
              bg-main-color text-main-text
                
             p-2  z-10 top-0 left-0 `}
          >
            <Hamburger toggleSideMenu={toggleSideMenu} />
            <div className="mx-2 flex-1">
              <MobileSearchbar />
            </div>

            <MobileIcons withoutLanguage={true} withoutFlag={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
