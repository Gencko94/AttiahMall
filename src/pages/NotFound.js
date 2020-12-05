import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import bg from '../assets/404.jpg';
export default function NotFound() {
  const { formatMessage, locale } = useIntl();
  return (
    <div
      className="not-found-page__container-desktop"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className=" not-found-title-desktop">
        <div className="flex justify-center items-center">
          <h1 style={{ fontSize: '150px', fontWeight: '500' }}>
            {formatMessage({ id: 'oops' })}
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center mb-2">
          <h1 className="text-3xl font-semibold">
            {formatMessage({ id: 'not-found-title' })}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Link
            className="inline-block uppercase p-3 bg-main-color rounded text-body-light"
            to={`/${locale}`}
          >
            {formatMessage({ id: 'back-to-home' })}
          </Link>
        </div>
      </div>
    </div>
  );
}
