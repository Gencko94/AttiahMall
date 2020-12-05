import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import logoattiah from '../../assets/attiah.png';
export default function ThirdSection() {
  const { formatMessage } = useIntl();
  return (
    <div
      className={`pt-4 px-8 pb-2 bg-first-nav-light text-main-text  flex items-center justify-between  `}
    >
      <div className="flex items-center ">
        <img src={logoattiah} alt="logo" style={{width:"40px",height:'40px'}} />

        <h1 className=" font-semibold text-sm mx-2">
          &copy; 2020 AttiahMall . {formatMessage({ id: 'footer-all-rights' })}
        </h1>
      </div>
      <div className="flex justify-evenly">
        <button className="mr-4">
          <FaFacebook className=" text-blue-600 h-25p w-25p" />
        </button>
        <button className="mr-4">
          <FaTwitter className=" text-blue-400 h-25p w-25p" />
        </button>
        <button className="mr-4">
          <FaInstagram className="h-25p w-25p text-red-400" />
        </button>
        <button className="mr-4">
          <FaLinkedin className="h-25p w-25p text-blue-600" />
        </button>
      </div>
    </div>
  );
}
