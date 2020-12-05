import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { useIntl } from 'react-intl';
import attiahlogo from '../../assets/attiah.png';
export default function ThirdSection() {
  const { formatMessage } = useIntl();
  return (
    <div className="p-4 pb-2 text-gray-100 bg-gray-900 ">
      <div className="flex justify-evenly mb-2">
        <button className="text-blue-600 transition duration-150">
          <FaFacebook className="h-25p w-25p" />
        </button>
        <button>
          <FaTwitter className=" text-blue-400 h-25p w-25p" />
        </button>
        <button>
          <FaInstagram className="h-25p w-25p text-red-400" />
        </button>
        <button>
          <FaLinkedin className="h-25p w-25p text-blue-600" />
        </button>
      </div>
      <div className=" px-4 py-2 flex justify-start items-end ">
        <img
          src={attiahlogo}
          alt="logo"
          style={{ width: '50px', height: '50px' }}
        />

        <h1 className=" font-semibold text-xs text-right mx-4">
          &copy; 2020 AttiahMall . {formatMessage({ id: 'footer-all-rights' })}
        </h1>
      </div>
    </div>
  );
}
