import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import logo from '../../assets/mrgnavlogo.png';

export default function NavLogoMobile() {
  const { locale } = useIntl();
  return (
    <div className=" flex-1 mx-3   text-sm">
      <Link to={`/${locale}/`} className="text-second-nav-light w-20 block">
        <img src={logo} alt="MRG-logo" className="w-20" />
      </Link>
    </div>
  );
}
