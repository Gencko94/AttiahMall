import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
export default function NotFoundMobile() {
  const { formatMessage, locale } = useIntl();
  return (
    <div className="not-found-page__container-desktop">
      <div className=" not-found-title-desktop">
        <div className="justify-center items-center flex mb-4">
          <h1
            className="text-gray-600 text-center "
            style={{ fontSize: '150px' }}
          >
            404
          </h1>
        </div>
        <div className="flex justify-center items-center mb-2">
          <h1 style={{ fontSize: '100px', fontWeight: '500' }}>
            {formatMessage({ id: 'oops' })}
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center mb-3">
          <h1 className="text-xl font-semibold text-center">
            {formatMessage({ id: 'not-found-title' })}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Link
            className="inline-block uppercase p-2 bg-main-color rounded text-body-light"
            to={`/${locale}`}
          >
            {formatMessage({ id: 'back-to-home' })}
          </Link>
        </div>
      </div>
    </div>
  );
}
