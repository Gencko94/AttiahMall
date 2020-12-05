import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import Select from 'react-select';

export default function MyProfileMobile() {
  const { formatMessage } = useIntl();
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const containerVariants = {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="">
        <div className="px-3 py-3 flex justify-between  text-gray-900">
          <h1 className="text-xl font-semibold">
            {' '}
            {formatMessage({ id: 'general-information' })}
          </h1>
          <button className="px-2 py-1 text-sm  font-semibold bg-red-600 text-gray-100 rounded">
            {formatMessage({ id: 'edit' })}
          </button>
        </div>
        <hr />
        <div className=" ">
          <div className="py-4 px-3 flex  ">
            <h1 className=" font-semibold w-2/4">
              {formatMessage({ id: 'full-name' })}
            </h1>
            <h1 className="">John Doe</h1>
          </div>

          <div className="py-4 px-3 flex  bg-red-100">
            <h1 className=" font-semibold w-2/4">
              {formatMessage({ id: 'phone-number' })}
            </h1>
            <h1 className="">+8792156875</h1>
          </div>
          <div className="py-4 px-3 flex  ">
            <h1 className=" font-semibold w-2/4">
              {formatMessage({ id: 'date-of-birth' })}
            </h1>
            <h1 className="">18-8-2018</h1>
          </div>
        </div>
      </div>
      <hr className="mt-4 mb-2" />
      <div className="">
        <div className="px-3 py-3 flex justify-between text-gray-900">
          <h1 className="text-xl font-semibold">
            {' '}
            {formatMessage({ id: 'security' })}
          </h1>
          <button className="py-1 px-2 text-sm  font-semibold bg-red-600 text-gray-100 rounded">
            {formatMessage({ id: 'edit' })}
          </button>
        </div>
        <hr />
        <div className="">
          <div className="py-4 px-3 flex ">
            <h1 className=" font-semibold w-2/4">
              {formatMessage({ id: 'email-address' })}
            </h1>
            <h1 className="">John@Doe.com</h1>
          </div>
          <div className="py-4 px-3 flex  bg-red-100">
            <h1 className=" font-semibold w-2/4">
              {formatMessage({ id: 'password' })}
            </h1>
            <h1 className="">**********</h1>
          </div>
        </div>
      </div>
      <hr className="mt-5 mb-2" />
      <div className="">
        <div className="px-3 py-3 text-gray-900">
          <h1 className="text-xl font-semibold">
            {formatMessage({ id: 'language' })}
          </h1>
        </div>
        <hr />
        <div className="">
          <div className="py-4 px-3 flex items-center ">
            <h1 className=" font-semibold w-2/4">
              {formatMessage({ id: 'preffered-language' })}
            </h1>
            <Select
              defaultValue={language}
              onChange={e => setLanguage(e)}
              options={languages}
              className="flex-1 text-center"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
