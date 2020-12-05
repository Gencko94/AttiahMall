import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import logo from '../../assets/mrgnavlogo.png';
export default function Logo() {
  const { locale } = useIntl();
  return (
    <div
      className=" grid place-items-center   text-sm  "
      style={{ flexBasis: '120px' }}
    >
      <Link to={`/${locale}/`} className="text-second-nav-light">
        <img
          // src={`${process.env.REACT_ARR_IMAGES_URL}/original/1606839936-mrg-setting-store_logo.png`}
          src={logo}
          alt="MRG-logo"
          className="w-24"
        />
      </Link>
    </div>
  );
}