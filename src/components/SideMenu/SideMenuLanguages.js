import React from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';

export default function SideMenuLanguages({ handleHideLanguages }) {
  const { formatMessage, locale } = useIntl();
  const { pathname } = useLocation();
  const getCurrentPath = pathname => {
    return pathname.slice(4);
  };
  return (
    <div className="sidebar-page">
      <button
        onClick={handleHideLanguages}
        className="py-2 px-2 mb-2 font-semibold uppercase  "
      >
        {formatMessage({ id: 'go-back' })}
      </button>
      <hr />

      <button
        onClick={() => {
          if (locale === 'ar') {
            return;
          }
          window.location.href = `/ar/${getCurrentPath(pathname)}`;
        }}
        className={`${
          locale === 'ar' && 'bg-main-color text-main-text'
        } py-2 px-2 mb-2 flex items-center font-cairo  justify-center font-semibold`}
      >
        العربية
      </button>
      <button
        onClick={() => {
          if (locale === 'en') {
            return;
          }
          window.location.href = `/en/${getCurrentPath(pathname)}`;
        }}
        className={`${
          locale === 'en' && 'bg-main-color text-main-text'
        } py-2 px-2 mb-2 flex items-center  justify-center font-semibold`}
      >
        English
      </button>
    </div>
  );
}
