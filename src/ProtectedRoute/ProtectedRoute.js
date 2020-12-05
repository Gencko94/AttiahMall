import React from 'react';
import { useIntl } from 'react-intl';
import { Redirect, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function ProtectedRoute({ Component, path, ...args }) {
  const { locale } = useIntl();
  const { isAuthenticated, authenticationLoading, userId } = React.useContext(
    AuthProvider
  );
  return (
    <Route
      {...args}
      path={path}
      render={({ location }) => {
        if (authenticationLoading)
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Loader
                type="ThreeDots"
                color="#b72b2b"
                height={50}
                width={50}
                visible={authenticationLoading}
              />
            </div>
          );
        if (isAuthenticated === true) {
          return <Component userId={userId} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: `/${locale}/app/login`,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
