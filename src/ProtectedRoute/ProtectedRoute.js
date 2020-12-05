import React from 'react';
import { useIntl } from 'react-intl';
import { Redirect, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import BeatLoader from 'react-spinners/BeatLoader';
export default function ProtectedRoute({ children, ...args }) {
  const { locale } = useIntl();
  const { isAuthenticated, authenticationLoading } = React.useContext(
    AuthProvider
  );
  return (
    <Route
      {...args}
      render={() => {
        if (authenticationLoading)
          return (
            <div className="min-h-screen flex items-center justify-center">
              <BeatLoader size={20} color="#b72b2b" />
            </div>
          );
        if (isAuthenticated === true) {
          return children;
        } else {
          return <Redirect to={`/${locale}/app/login`} />;
        }
      }}
    />
  );
}
