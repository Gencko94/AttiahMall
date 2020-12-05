import React from 'react';
import { FiMap } from 'react-icons/fi';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineFileDone } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { useIntl } from 'react-intl';
export default function Stepper({ selectedStep, stepDone }) {
  const { formatMessage } = useIntl();
  return (
    <div className="p-4  md:max-w-screen-lg xxl:max-w-xl  mx-auto">
      <div className="">
        <div className="flex items-center ">
          <div className="flex items-center   relative">
            <div
              className={`rounded-full ${
                selectedStep === 0 &&
                'bg-second-nav-light text-second-nav-text-light border-second-nav-light '
              } ${
                stepDone[0] &&
                'bg-green-700 border-green-700 text-second-nav-text-light'
              } transition duration-500 ease-in-out h-12 w-12 py-3 border-2 `}
            >
              {stepDone[0] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <FiMap className="w-full h-full" />
              )}
            </div>
            <div
              className={`mx-1 ${
                selectedStep === 0 && 'font-bold'
              }  text-center text-xs  uppercase `}
            >
              {formatMessage({ id: 'address' })}
            </div>
          </div>
          <div className="flex-auto border-t-2 transition duration-500 ease-in-out "></div>
          <div className="flex items-center relative">
            <div
              className={`${
                stepDone[1] &&
                'bg-green-700 border-green-700 text-second-nav-text-light'
              } ${
                selectedStep === 1 &&
                'bg-second-nav-light text-second-nav-text-light border-second-nav-light font-bold'
              } rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2  `}
            >
              {stepDone[1] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <FaUserAlt className="w-full h-full" />
              )}
            </div>
            <div
              className={`text-center mx-1 text-xs uppercase  ${
                selectedStep === 1 && 'font-bold '
              } `}
            >
              {formatMessage({ id: 'personal-information' })}
            </div>
          </div>
          <div
            className={`flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300`}
          ></div>
          <div className={`flex items-center relative`}>
            <div
              className={`${
                stepDone[2] &&
                'bg-green-700 border-green-700 text-second-nav-text-light'
              } ${
                selectedStep === 2 &&
                'bg-second-nav-light text-second-nav-text-light border-second-nav-light font-bold'
              } rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2`}
            >
              {stepDone[2] ? (
                <MdDone className="w-full h-full" />
              ) : (
                <AiOutlineFileDone className="w-full h-full" />
              )}
            </div>
            <div
              className={`${
                selectedStep === 2 && 'font-bold'
              } text-center mx-1 text-xs uppercase `}
            >
              {formatMessage({ id: 'order-placed' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
