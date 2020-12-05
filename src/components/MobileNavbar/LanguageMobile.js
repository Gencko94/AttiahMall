import React from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

export default function LanguageMobile() {
  const { locale } = useIntl();
  const { pathname } = useLocation();

  const getCurrentPath = pathname => {
    return pathname.slice(4);
  };
  return (
    <div className="p-1">
      {locale === 'en' && (
        <Link
          to={`/ar/${getCurrentPath(pathname)}`}
          className="font-semibold font-cairo transition duration-100 hover:text-gray-300"
        >
          العربية
        </Link>
      )}
      {locale === 'ar' && (
        <Link
          to={`/en/${getCurrentPath(pathname)}`}
          className="font-semibold font-cairo transition duration-100 hover:text-gray-300"
        >
          English
        </Link>
      )}
    </div>
  );
}
