import React from 'react';
import ProfileEditModal from '../Modals/ProfileEditModal';

import { useIntl } from 'react-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { AuthProvider } from '../../contexts/AuthContext';
import PasswordChangeModal from '../Modals/PasswordChangeModal';
export default function MyProfile() {
  const { formatMessage } = useIntl();

  const [profileEditModalOpen, setProfileEditModalOpen] = React.useState(false);
  const [passwordChangeModalOpen, setPasswordChangeModalOpen] = React.useState(
    false
  );
  const {
    userData,
    editMutation,
    authenticationLoading,
    authenticationFetching,
    changePasswordMutation,
  } = React.useContext(AuthProvider);

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
  if (authenticationLoading || authenticationFetching) {
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
          <Loader
            type="ThreeDots"
            color="#b72b2b"
            height={40}
            width={40}
            visible={true}
          />
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
              <h1 className="">{userData.name}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'phone-number' })}
              </h1>
              <h1 className="">{userData.mobile}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'email-address' })}
              </h1>
              <h1 className="">{userData.email}</h1>
            </div>
            <hr />
          </div>
          <div>
            <div className={` py-4 px-3 flex    `}>
              <h1 className="  w-2/4">
                {formatMessage({ id: 'date-joined' })}
              </h1>
              <h1 className="">{userData.created_at}</h1>
            </div>
            <hr />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end  py-4 px-3">
        <button
          onClick={() => setPasswordChangeModalOpen(true)}
          className={`px-4 py-1 bg-main-color text-main-text rounded uppercase`}
        >
          {formatMessage({ id: 'change-password' })}
        </button>
      </div>

      <AnimatePresence>
        {profileEditModalOpen && (
          <ProfileEditModal
            userData={userData}
            setProfileEditModalOpen={setProfileEditModalOpen}
            editMutation={editMutation}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {passwordChangeModalOpen && (
          <PasswordChangeModal
            setPasswordChangeModalOpen={setPasswordChangeModalOpen}
            changePasswordMutation={changePasswordMutation}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
