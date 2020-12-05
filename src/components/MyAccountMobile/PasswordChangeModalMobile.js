import { Formik, useField } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';
import ErrorSnackbar from '../ErrorSnackbar';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
export default function PasswordChangeModalMobile({
  changePasswordMutation,
  setPasswordChangeModalOpen,
}) {
  const { formatMessage, locale } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .min(6, formatMessage({ id: 'password-min-6' }))
      .max(15, formatMessage({ id: 'password-max-15' })),

    confirmPassword: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .when('newPassword', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('newPassword')],
          formatMessage({ id: 'same-password' })
        ),
      }),
  });
  const containerVariants = {
    hidden: {
      y: '50%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'tween',
      },
    },
    exited: {
      x: '100%',
      opacity: 0,
      transition: {
        type: 'tween',
      },
    },
  };
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="fixed top-0 left-0 right-0 bottom-0  bg-body-light z-30 h-screen"
    >
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
        <button
          className="text-main-text text-center"
          onClick={() => setPasswordChangeModalOpen(false)}
        >
          {locale === 'en' ? (
            <AiOutlineArrowLeft className="w-6 h-6 " />
          ) : (
            <AiOutlineArrowRight className="w-6 h-6 " />
          )}
        </button>
        <h1 className="font-semibold text-lg mx-4">
          {formatMessage({ id: 'change-password' })}
        </h1>
      </div>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async values => {
          setErrorOpen(false);
          try {
            await changePasswordMutation(values);
            setPasswordChangeModalOpen(false);
          } catch (error) {
            setErrorOpen(true);
            setErrorMessage('Something went wrong, Please try again');
          }
        }}
      >
        {({ handleSubmit, values, isSubmitting }) => {
          return (
            <form className="px-3 py-2 " onSubmit={handleSubmit}>
              <CustomTextInput
                label={formatMessage({ id: 'old-password' })}
                name="oldPassword"
                value={values.oldPassword}
                type="password"
              />

              <CustomTextInput
                label={formatMessage({ id: 'new-password' })}
                name="newPassword"
                value={values.newPassword}
                type="password"
              />
              <CustomTextInput
                label={formatMessage({ id: 'confirm-password' })}
                name="confirmPassword"
                value={values.confirmPassword}
                type="password"
              />

              <div className="mt-1">
                <button
                  type="submit"
                  className={`${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                  } w-full rounded flex items-center justify-center text-sm  p-2 font-semibold  transition duration-150 uppercase `}
                >
                  {isSubmitting && (
                    <Loader
                      type="ThreeDots"
                      color="#b72b2b"
                      height={20}
                      width={20}
                      visible={isSubmitting}
                    />
                  )}
                  {!isSubmitting && formatMessage({ id: 'save-button' })}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </motion.div>
  );
}
const CustomTextInput = ({ label, value, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="mb-2">
      <label htmlFor={name} className={` font-semibold `}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className={` ${
          meta.error && meta.touched && 'border-main-color'
        } w-full rounded-lg border p-2 mt-1`}
      />
      {meta.touched && meta.error ? (
        <h1 className="text-xs text-main-color mt-1">{meta.error}</h1>
      ) : (
        <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};
