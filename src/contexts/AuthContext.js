import React from 'react';
import { queryCache, useMutation, useQuery } from 'react-query';
export const AuthProvider = React.createContext();
export default function AuthContext({ children }) {
  /**
   * Authentication
   */
  const checkAuthenticationStatus = () => {
    const localAuthenticated = localStorage.getItem('localAuthenticated');
    return new Promise(resolve => {
      setTimeout(() => {
        if (localAuthenticated === 'true') {
          resolve({ isAuthenticated: true });
        } else {
          resolve({ isAuthenticated: false });
        }
      }, 2000);
    });
  };

  const { data: isAuthenticated, isLoading: authenticationLoading } = useQuery(
    'authentication',
    async () => {
      const { isAuthenticated } = await checkAuthenticationStatus();
      return isAuthenticated;
    }
  );

  /**
   * User Login
   */
  const [userLogin] = useMutation(
    async data => {
      const res = await handleUserLogin(data);
      if (res.message === 'ok') {
        return res.message;
      }
    },
    {
      onSuccess: () => {
        queryCache.setQueryData('authentication', () => {
          return true;
        });
      },
    }
  );

  /**
   * User Register
   */
  const [userRegister] = useMutation(
    async data => {
      const res = await handleUserRegister(data);
      if (res.message === 'ok') {
        return res.message;
      }
    },
    {
      onSuccess: () => {
        queryCache.setQueryData('authentication', () => {
          return true;
        });
      },
    }
  );

  /**
   * User Logout
   */
  const [userLogout] = useMutation(() => {
    queryCache.setQueryData('authentication', () => {
      return false;
    });
    localStorage.setItem('localAuthenticated', false);
  });

  /**
   *
   */

  const handleUserRegister = data => {
    return new Promise(resolve => {
      localStorage.setItem('localAuthenticated', true);
      setTimeout(() => {
        resolve({
          message: 'ok',
        });
      }, 1500);
    });
  };
  const handleUserLogin = data => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem('localAuthenticated', true);
        resolve({
          message: 'ok',
        });
      }, 1500);
    });
  };

  return (
    <AuthProvider.Provider
      value={{
        isAuthenticated,
        authenticationLoading,
        userRegister,
        userLogin,
        userLogout,
      }}
    >
      {children}
    </AuthProvider.Provider>
  );
}
