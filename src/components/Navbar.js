import React from 'react';
import NavIcons from './NavbarComponents/NavIcons';
import ShipTo from './NavbarComponents/ShipTo';
import Language from './NavbarComponents/Language';
import LoginRegister from './NavbarComponents/LoginRegister';
import Logo from './NavbarComponents/Logo';
import SearchBar from './NavbarComponents/SearchBar';
import NavCategory from './NavbarComponents/NavCategory';
import { DataProvider } from '../contexts/DataContext';
import { Link, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
// import Promos from './NavbarComponents/Promos';

export default function Navbar() {
  const {
    authenticationLoading,
    isAuthenticated,
    userLogout,
  } = React.useContext(AuthProvider);
  const { isLightTheme } = React.useContext(DataProvider);
  const { pathname } = useLocation();
  const specialPages =
    pathname.includes('/user/account') || pathname.includes('/quickcheckout');
  const { formatMessage, locale } = useIntl();
  return (
    <>
      {!specialPages && (
        <div
          className={` font-semibold py-1 z-10 ${
            isLightTheme
              ? 'bg-first-nav-light text-first-nav-text-light'
              : 'bg-first-nav-dark text-first-nav-text-dark'
          } text-sm `}
        >
          <div className="max-w-default mx-auto flex items-center justify-between px-6">
            <div className="flex">
              <Language />
              <span className="border-r mx-1  border-gray-300 opacity-50"></span>
              <ShipTo />
            </div>
            <div className="flex justify items-center">
              {!authenticationLoading && (
                <>
                  {isAuthenticated && (
                    <div className="mx-2">
                      <Link className="mx-2" to={`/${locale}/user/account`}>
                        {formatMessage({ id: 'nav.account' })}
                      </Link>
                      <button onClick={userLogout}>logout</button>
                    </div>
                  )}
                </>
              )}
              {authenticationLoading && <h1>Loading...</h1>}
              <LoginRegister />
            </div>
          </div>
        </div>
      )}

      <div
        className={` z-10 sticky top-0 left-0   ${
          isLightTheme
            ? 'bg-second-nav-light text-second-nav-text-light'
            : 'bg-second-nav-dark text-second-nav-text-dark'
        }   py-2  `}
      >
        <div className="max-w-default mx-auto flex items-center  justify-between px-6">
          <Logo />
          <SearchBar />
          <NavIcons />
        </div>
      </div>

      {!specialPages && <NavCategory />}
    </>
  );
}
