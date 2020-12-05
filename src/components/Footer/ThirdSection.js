import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import attiahlogo from '../../assets/attiah.png';
import { getSocialMediaData } from '../../Queries/Queries';
export default function ThirdSection() {
  const { data } = useQuery('socialMedia', getSocialMediaData, { retry: true });
  const { formatMessage } = useIntl();
  return (
    <div
      className={`pt-4 px-8 pb-2 bg-first-nav-light text-main-text  flex items-center justify-between  `}
    >
      <div className="flex items-center ">
        <img
          src={attiahlogo}
          alt="logo"
          style={{ width: '50px', height: '50px' }}
        />

        <h1 className=" font-semibold text-sm mx-2">
          &copy; 2020 AttiahMall . {formatMessage({ id: 'footer-all-rights' })}
        </h1>
      </div>
      {data && (
        <div className="flex justify-evenly">
          <a
            rel="noopener noreferrer"
            href={`${data.sm_facebook}`}
            target="_blank"
            className="mr-4"
          >
            <FaFacebook className=" text-blue-600 h-25p w-25p" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${data.sm_twitter}`}
            target="_blank"
            className="mr-4"
          >
            <FaTwitter className=" text-blue-400 h-25p w-25p" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${data.sm_instagram}`}
            target="_blank"
            className="mr-4"
          >
            <FaInstagram className="h-25p w-25p text-red-400" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${data.sm_linkedin}`}
            target="_blank"
            className="mr-4"
          >
            <FaLinkedin className="h-25p w-25p text-blue-600" />
          </a>
          <a
            rel="noopener noreferrer"
            href={`${data.sm_whatsapp}`}
            target="_blank"
            className="mr-4"
          >
            <FaWhatsapp className="h-25p w-25p text-green-600" />
          </a>
        </div>
      )}
    </div>
  );
}
