import { Formik, useField } from 'formik';
import { motion } from 'framer-motion';
import React from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
// import { BiChevronDown } from 'react-icons/bi';
import { useIntl } from 'react-intl';
// import useClickAway from '../../hooks/useClickAway';
import * as Yup from 'yup';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../ErrorSnackbar';

export default function ProfileEditModalMobile({
  setProfileEditModalOpen,
  userData,
  editMutation,
}) {
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const { formatMessage, locale } = useIntl();
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = 'unset');
  }, []);
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),

    name: Yup.string().required(formatMessage({ id: 'fullname-empty' })),
    // phoneNumber: Yup.string()
    //   .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
    //   .required(formatMessage({ id: 'phone-empty' })),
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
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="fixed top-0 left-0 right-0 bottom-0 overflow-y-scroll bg-body-light z-30 h-screen"
    >
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" sticky top-0 p-3 flex items-center bg-main-color text-main-text z-1">
        <button
          className="text-main-text text-center"
          onClick={() => setProfileEditModalOpen(false)}
        >
          {locale === 'en' ? (
            <AiOutlineArrowLeft className="w-6 h-6 " />
          ) : (
            <AiOutlineArrowRight className="w-6 h-6 " />
          )}
        </button>
        <h1 className="font-semibold text-lg mx-4">
          {formatMessage({ id: 'edit-personal-information' })}
        </h1>
      </div>
      <Formik
        initialValues={{
          email: userData.email || '',
          name: userData.name,
        }}
        validationSchema={validationSchema}
        onSubmit={async values => {
          setErrorOpen(false);
          try {
            await editMutation(values);
            setProfileEditModalOpen(false);
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
                label={formatMessage({ id: 'full-name' })}
                name="name"
                value={values.name}
                type="text"
              />
              {/* <PhoneNumberCustomInput
                label={formatMessage({ id: 'phone-number' })}
                name="phoneNumber"
                value={values.phoneNumber}
                type="text"
              /> */}

              <CustomTextInput
                label={formatMessage({ id: 'email-address' })}
                name="email"
                value={values.email}
                type="email"
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
        className=" w-full rounded-lg border p-2 mt-1"
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
// const PhoneNumberCustomInput = ({ label, value, name, ...props }) => {
//   const [menuOpen, setMenuOpen] = React.useState(false);
//   const menuRef = React.useRef();
//   useClickAway(menuRef, () => {
//     if (menuRef.current) {
//       setMenuOpen(false);
//     }
//   });
//   const [field, meta] = useField(name);
//   return (
//     <div className="mb-2">
//       <label htmlFor={name} className={`font-semibold `}>
//         {label}
//       </label>
//       <div className="flex rounded-lg border items-center relative  overflow-hidden mt-1 ">
//         <div
//           ref={menuRef}
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="  cursor-pointer flex items-center p-1 border-r"
//           style={{ width: '74px' }}
//         >
//           <span>+965</span>
//           <BiChevronDown className="mx-1 w-5 h-5" />
//           {menuOpen && (
//             <div
//               className="absolute top-100 left-0 w-full border z-1 bg-body-light"
//               style={{ width: '74px' }}
//             >
//               <div className="hover:bg-main-color px-1 py-2 hover:text-main-text flex justify-start items-center">
//                 +965
//               </div>
//             </div>
//           )}
//         </div>
//         <input
//           {...field}
//           {...props}
//           onBlur={e => {
//             field.onBlur(e);
//           }}
//           className=" w-full  p-2"
//         />
//       </div>
//       {meta.touched && meta.error ? (
//         <h1 className="text-xs text-main-color mt-1">{meta.error}</h1>
//       ) : (
//         <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
//           {' '}
//         </h1>
//       )}
//     </div>
//   );
// };
