import React from 'react';
import { IoMdCall } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import { useIntl } from 'react-intl';
export default function FirstSection() {
  const { formatMessage } = useIntl();
  return (
    <div
      className={`flex  justify-evenly items-center p-8 bg-main-color text-main-text `}
    >
      <div className="text-center  font-bold">
        <h1 className="text-lg">{formatMessage({ id: 'footer-help' })}</h1>
        <h1 className="text-sm  font-semibold">
          {formatMessage({ id: 'footer-reach' })}
        </h1>
      </div>
      <div className="flex  items-center justify-center  ">
        <div className="p-1  rounded-full bg-gray-800 ">
          <IoMdCall className=" h-25p w-25p" />
        </div>
        <div className="flex flex-col text-center font-semibold mx-2">
          <h1 className="text-sm">
            {formatMessage({ id: 'footer-help-center' })}
          </h1>
          <h1 className="text-sm">
            {formatMessage({ id: 'footer-call' })} +123456789
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <div className="p-1  rounded-full bg-gray-800 ">
          <MdEmail className=" h-25p w-25p" />
        </div>
        <div className="flex text-center font-semibold flex-col mx-2">
          <h1 className="text-sm">
            {formatMessage({ id: 'footer-contact-email' })}
          </h1>
          <h1 className="text-base">help@attiahmall.com</h1>
        </div>
      </div>
    </div>
  );
}
