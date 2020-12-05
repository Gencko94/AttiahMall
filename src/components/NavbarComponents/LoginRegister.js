import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
export default function LoginRegister() {
  const { isLightTheme } = React.useContext(DataProvider);
  const { formatMessage, locale } = useIntl();
  return (
    <div className="flex ml-auto text-first-nav-text-light  ">
      <Link to={`/${locale}/app/login`}>
        <button
          className={`p-1 font-semibold   rounded mr-1 ${
            isLightTheme
              ? 'hover:bg-second-nav-light hover:text-second-nav-text-light'
              : 'hover:bg-second-nav-dark hover:text-second-nav-text-dark'
          } transition duration-150`}
        >
          {formatMessage({ id: 'nav.login' })}
        </button>
      </Link>
      <Link to={`/${locale}/app/register`}>
        <button
          className={`p-1 font-semibold   rounded ${
            isLightTheme
              ? 'hover:bg-second-nav-light hover:text-second-nav-text-light'
              : 'hover:bg-second-nav-dark hover:text-second-nav-text-dark'
          } transition duration-150`}
        >
          {formatMessage({ id: 'nav.register' })}
        </button>
      </Link>
    </div>
  );
}
