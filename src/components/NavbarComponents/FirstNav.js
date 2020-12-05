import React from 'react';
import LoginRegister from './LoginRegister';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../contexts/AuthContext';
import Language from './Language';
import ShipTo from './ShipTo';
import HelloUser from './HelloUser';
export default function FirstNav() {
  const {
    authenticationLoading,
    isAuthenticated,
    authenticationFetching,
  } = React.useContext(AuthProvider);
  return (
    <div
      className={` font-semibold py-1 z-30 
      
        bg-first-nav-light text-main-text
          
       text-sm `}
    >
      <div className="max-w-default mx-auto flex items-center justify-between px-6">
        <div className="flex">
          <Language />
          <span className="border-r mx-1  border-gray-300 opacity-50"></span>
          <ShipTo />
        </div>
        <div className="flex justify-center items-center">
          {authenticationLoading || authenticationFetching ? (
            <Loader
              type="ThreeDots"
              color="#fff"
              secondaryColor="black"
              height={20}
              width={20}
              visible={authenticationLoading}
            />
          ) : isAuthenticated ? (
            <HelloUser />
          ) : (
            <LoginRegister />
          )}
          {/* {authenticationLoading && (
            <Loader
              type="ThreeDots"
              color="#fff"
              secondaryColor="black"
              height={20}
              width={20}
              visible={authenticationLoading}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
