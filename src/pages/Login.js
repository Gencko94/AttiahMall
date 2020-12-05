import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/mrg.svg';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import ErrorSnackbar from '../components/ErrorSnackbar';
import login from '../assets/login.jpg';
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
        className={`flex rounded-lg border relative  ${
          meta.error && 'border-main-color'
        }`}
      >
        <div
          ref={menuRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className=" relative cursor-pointer flex items-center p-1 border-r"
          style={{ width: '74px' }}
        >
          <span>+965</span>
          <BiChevronDown className="mx-1 w-5 h-5" />
          {menuOpen && (
            <div
              className="absolute top-100 left-0 w-full border z-3 bg-body-light shadow"
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
          className={`w-full  p-2`}
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
        className={`${
          meta.error && meta.touched && 'border-main-color'
        } w-full rounded-lg border  p-2`}
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

export default function Login() {
  const { formatMessage, locale } = useIntl();
  const { userLoginMutation } = React.useContext(AuthProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const location = useLocation();
  let { from } = location.state || { from: { pathname: `/${locale}/` } };
  const closeError = () => {
    setErrorOpen(false);
  };
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
    password: Yup.string().required(formatMessage({ id: 'password-empty' })),
  });
  return (
    <div className="login-container">
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${login})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="  text-gray-900 flex justify-center items-center   h-screen relative">
        {errorOpen && (
          <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
        )}
        <div className=" rounded z-2  max-w-screen-xs w-5/6">
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
          <div className="rounded-lg border bg-gray-100 mb-2">
            <Formik
              initialValues={{
                phoneNumber: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                setErrorOpen(false);
                try {
                  const res = await userLoginMutation(values);
                  if (res.isAuthenticated === true) {
                    history.replace(from);
                  }
                } catch (error) {
                  console.log(error.response);
                  if (error.response?.data.message) {
                    actions.setErrors({
                      phoneNumber: formatMessage({
                        id: 'invalid-credentials',
                      }),
                      password: formatMessage({
                        id: 'invalid-credentials',
                      }),
                    });
                    return;
                  } else {
                    setErrorOpen(true);
                    setErrorMessage(
                      formatMessage({ id: 'something-went-wrong-snackbar' })
                    );
                  }
                }
              }}
            >
              {({ handleSubmit, values, isSubmitting }) => {
                return (
                  <form className="px-3 py-2" onSubmit={handleSubmit}>
                    <PhoneNumberCustomInput
                      label={formatMessage({ id: 'phone-label' })}
                      name="phoneNumber"
                      value={values.phoneNumber}
                    />
                    <CustomTextInput
                      label={formatMessage({ id: 'password-label' })}
                      name="password"
                      type="password"
                      value={values.password}
                    />
                    <div className="mt-1">
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className={`${
                          isSubmitting
                            ? 'bg-main-color cursor-not-allowed'
                            : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                        } w-full rounded uppercase flex items-center justify-center  p-2 font-semibold  transition duration-150 `}
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
          <div className="rounded-lg border">
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
        <div className="credentials-language__container">
          <Language />
        </div>
        <div className="credentials-back-button__container">
          <button onClick={() => history.goBack()}>
            <AiOutlineArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
