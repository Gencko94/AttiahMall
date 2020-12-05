import { Formik, useField } from 'formik';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/mrg.svg';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { BiChevronDown } from 'react-icons/bi';
import useClickAway from '../hooks/useClickAway';
import Language from '../components/NavbarComponents/Language';
import { AiOutlineArrowLeft } from 'react-icons/ai';
const PhoneNumberCustomInput = ({ label, value, name, ...props }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef();
  useClickAway(menuRef, () => {
    if (menuRef.current) {
      setMenuOpen(false);
    }
  });
  const [field, meta] = useField(name);
  return (
    <div className="w-full mb-2 flex flex-col ">
      <label
        htmlFor={name}
        className={`text-sm font-semibold text-gray-800 mb-1`}
      >
        {label}
      </label>
      <div
        className={`${
          meta.error && 'border'
        } flex rounded-lg border items-center relative  overflow-hidden`}
      >
        <div
          ref={menuRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className="  cursor-pointer flex items-center p-1 border-r"
          style={{ width: '74px' }}
        >
          <span>+965</span>
          <BiChevronDown className="mx-1 w-5 h-5" />
          {menuOpen && (
            <div
              className="absolute top-100 left-0 w-full border z-1 bg-body-light"
              style={{ width: '74px' }}
            >
              <div className="hover:bg-main-color p-2 hover:text-main-text flex justify-start items-center">
                +965
              </div>
            </div>
          )}
        </div>
        <input
          {...field}
          {...props}
          onBlur={e => {
            field.onBlur(e);
          }}
          className=" w-full   p-2"
        />
      </div>
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

const CustomTextInput = ({ label, value, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="w-full relative mb-2 flex flex-col">
      <label
        htmlFor={name}
        className={` text-sm font-semibold text-gray-800 mb-1 `}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className={`${meta.error && 'border'} w-full rounded-lg border   p-2`}
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

export default function LoginMobile() {
  const { formatMessage, locale } = useIntl();
  const { userLoginMutation } = React.useContext(AuthProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const location = useLocation();
  let { from } = location.state || { from: { pathname: `/${locale}/` } };
  const history = useHistory();
  const validationSchema = Yup.object({
    password: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .min(6, formatMessage({ id: 'password-min-6' }))
      .max(15, formatMessage({ id: 'password-max-15' })),

    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });
  return (
    <div className=" text-gray-900 flex justify-center items-center px-4 py-2  h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" z-2  w-full   overflow-hidden">
        <div className="flex items-center flex-col mb-2  rounded-lg ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className=" mb-3"
              style={{ width: '100px', height: '50px' }}
            />
          </Link>
          <h2 className="text-lg text-center">
            {formatMessage({ id: 'login-welcome-back' })}
          </h2>
        </div>
        <div className="rounded-lg border bg-gray-100 mb-2 shadow">
          <Formik
            initialValues={{
              password: '',
              phoneNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setErrors }) => {
              setErrorOpen(false);
              try {
                const res = await userLoginMutation(values);
                console.log(res);
                if (res.isAuthenticated === true) {
                  history.replace(from);
                }
              } catch (error) {
                if (error.response?.data.message) {
                  setErrors({
                    phoneNumber: formatMessage({
                      id: error.response.data.message,
                    }),
                    password: formatMessage({
                      id: error.response.data.message,
                    }),
                  });
                  return;
                }
                setErrorOpen(true);
                setErrorMessage(
                  formatMessage({ id: 'something-went-wrong-snackbar' })
                );
              }
            }}
          >
            {({ handleSubmit, values, isSubmitting }) => {
              return (
                <form className="px-3 py-2 " onSubmit={handleSubmit}>
                  <PhoneNumberCustomInput
                    label={formatMessage({ id: 'phone-label' })}
                    name="phoneNumber"
                    value={values.phoneNumber}
                    type="text"
                  />
                  <CustomTextInput
                    label={formatMessage({ id: 'password-label' })}
                    name="password"
                    value={values.password}
                    type="password"
                  />

                  <div className="mt-1">
                    <button
                      type="submit"
                      className={`${
                        isSubmitting
                          ? 'bg-main-color cursor-not-allowed'
                          : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                      } w-full rounded  p-2 flex items-center justify-center font-semibold  transition duration-150 uppercase `}
                    >
                      {isSubmitting && (
                        <Loader
                          type="ThreeDots"
                          color="#fff"
                          secondaryColor="black"
                          height={24}
                          width={24}
                          visible={isSubmitting}
                        />
                      )}
                      {!isSubmitting && formatMessage({ id: 'login-button' })}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
        <div className="">
          <div className="px-3 py-2">
            <h1 className="text-sm">
              {formatMessage({ id: 'new-to-family' })}
              <Link
                className="text-second-nav-light"
                to={`/${locale}/app/register`}
              >
                {formatMessage({ id: 'join-us-here' })}
              </Link>
            </h1>
            <Link
              to={`/${locale}/app/password-reset`}
              className=" text-sm text-second-nav-light"
            >
              {formatMessage({ id: 'forgot-password' })}
            </Link>
          </div>
        </div>
      </div>
      <div className="credentials-language__container-mobile">
        <Language />
      </div>
      <div className="credentials-back-button__container-mobile">
        <button onClick={() => history.goBack()}>
          <AiOutlineArrowLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
