import { motion } from 'framer-motion';
import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
export default function ProfileModal({ editMutation }) {
  const { isLightTheme } = React.useContext(DataProvider);
  const options = [
    {
      title: 'Email',
      placeHolder: 'Enter your Email address',
    },
    {
      title: 'Username',
      placeHolder: 'Enter your Username',
    },
    {
      title: 'Phone Number',
      placeHolder: 'Enter your Phone number',
    },
    {
      title: 'Date of Birth',
      placeHolder: 'Enter your Date of birth',
    },
  ];
  const containerVariants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: '-100%',
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed bg-body-light  z-50 top-0 w-full h-full left-0  flex justify-center items-center"
    >
      <div
        className={`rounded-lg border z-20 ${
          isLightTheme
            ? 'bg-body-light text-body-text-light'
            : 'bg-body-dark text-body-text-dark'
        } w-11/12 md:max-w-lg mx-auto`}
      >
        <h1 className=" p-4 text-lg font-semibold">Edit Profile</h1>
        <hr />
        {options.map((option, i) => {
          return (
            <div key={i} className=" text-sm w-full px-4 py-2 ">
              <h1 className=" mb-1  font-semibold">{option.title}</h1>
              <input
                className={`mt-1 w-full rounded border ${
                  isLightTheme
                    ? 'bg-nav-cat-light placeholder-gray-700'
                    : 'bg-nav-cat-dark placeholder-gray-200'
                }  p-2 `}
                type="text"
                placeholder={option.placeHolder}
              />
            </div>
          );
        })}
        {/* <hr /> */}
        <div className="px-4 flex justify-end py-2">
          <button
            className={`${
              isLightTheme
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-btn-primary-dark text-btn-secondary-dark'
            } py-1 px-3 mr-2 rounded`}
          >
            Save
          </button>
          <button
            className={`${
              isLightTheme
                ? 'bg-btn-primary-light text-btn-secondary-light'
                : 'bg-btn-primary-dark text-btn-secondary-dark'
            } py-1 px-3 rounded`}
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
