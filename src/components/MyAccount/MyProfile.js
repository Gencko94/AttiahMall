import React from 'react';
import ProfileModal from '../Modals/ProfileModal';
import Select from 'react-select';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import { AnimatePresence, motion } from 'framer-motion';
import { queryCache, useMutation, useQuery } from 'react-query';
import { BeatLoader } from 'react-spinners';
export default function MyProfile() {
  const {
    isLightTheme,
    getUserProfileInfo,
    editUserProfileInfo,
  } = React.useContext(DataProvider);
  const { formatMessage } = useIntl();
  const languages = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
  ];
  const [language, setLanguage] = React.useState(languages[1]);
  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);

  /**
   * Main Fetch
   */

  const { data, isLoading } = useQuery(
    'userProfile',
    async () => {
      const res = await getUserProfileInfo();
      return res;
    },
    { refetchOnWindowFocus: false }
  );

  /**
   * Edit Fetch
   */

  const [editMutation] = useMutation(
    async data => {
      return await editUserProfileInfo();
    },
    {
      onSuccess: data => {
        queryCache.setQueryData('userProfile', prev => {
          return {
            ...prev,
            data,
          };
        });
        setProfileEditModalOpen(false);
      },
    }
  );
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
  if (isLoading) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative"
        style={{ height: 'calc(-90px + 100vh)' }}
      >
        <div className="flex h-full justify-center items-center">
          <BeatLoader size={10} color={'#b72b2b'} />
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative"
      style={{ height: 'calc(-90px + 100vh)' }}
    >
      <div className="">
        <div className="bg-main-color text-main-text px-3 py-3 flex items center justify-between">
          <h1 className="text-lg">
            {formatMessage({ id: 'general-information' })}
          </h1>
          <button
            onClick={() => setProfileEditModalOpen(true)}
            className={`px-4 text-sm py-1 font-semibold bg-body-light text-btn-primary-light rounded`}
          >
            {formatMessage({ id: 'edit' })}
          </button>
        </div>
        <div className=" ">
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">{formatMessage({ id: 'full-name' })}</h1>
              <h1 className="">{data.fullName}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'phone-number' })}
              </h1>
              <h1 className="">{data.phoneNumber}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'date-of-birth' })}
              </h1>
              <h1 className="">{data.dateOfBirth}</h1>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="">
        <div className="px-3 py-3 bg-main-color text-main-text">
          <h1 className="text-lg ">{formatMessage({ id: 'language' })}</h1>
        </div>
        <div className="">
          <div
            className={`${
              isLightTheme
                ? 'bg-body-light text-body-text-light'
                : 'bg-body-dark text-body-text-dark'
            } py-3 px-3 flex items-center   `}
          >
            <h1 className=" font-semibold flex-1">
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

      <div className="">
        <div className="px-3 py-3 bg-main-color text-main-text flex items-center justify-between ">
          <h1 className="text-lg">{formatMessage({ id: 'security' })}</h1>
          <button
            className={`px-4 py-1 text-sm font-semibold bg-body-light text-btn-primary-light rounded`}
          >
            {formatMessage({ id: 'edit' })}
          </button>
        </div>
        <div className="">
          <div className="">
            <div
              className={`${
                isLightTheme ? 'bg-nav-cat-light' : 'bg-nav-cat-dark'
              } py-4 px-3 flex `}
            >
              <h1 className="  w-2/4">
                {formatMessage({ id: 'email-address' })}
              </h1>
              <h1 className="">John@doe.com</h1>
            </div>
          </div>
          <hr />
          <div
            className={`${
              isLightTheme ? 'bg-nav-cat-light' : 'bg-nav-cat-dark'
            } py-4 px-3 flex `}
          >
            <h1 className=" w-2/4">{formatMessage({ id: 'password' })}</h1>
            <h1 className="">**********</h1>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {profileEditModalOpen && <ProfileModal editMutation={editMutation} />}
      </AnimatePresence>
    </motion.div>
  );
}
