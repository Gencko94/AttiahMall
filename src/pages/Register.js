import { Formik, useField } from 'formik';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/attiah.png';
import * as Yup from 'yup';
import { FormattedMessage, useIntl } from 'react-intl';
import { AuthProvider } from '../contexts/AuthContext';
import { BeatLoader } from 'react-spinners';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { BiChevronDown } from 'react-icons/bi';
import useClickAway from '../hooks/useClickAway';
import register from '../assets/register.jpg';
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
      <div className="flex rounded-lg border items-center relative  overflow-hidden ">
        <div
          ref={menuRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className="  cursor-pointer flex items-center p-1 border-r"
          style={{ width: '74px' }}
        >
          <span>+966</span>
          <BiChevronDown className="mx-1 w-5 h-5" />
          {menuOpen && (
            <div
              className="absolute top-100 left-0 w-full border z-1 bg-body-light"
              style={{ width: '74px' }}
            >
              <div className="hover:bg-main-color px-1 py-2 hover:text-main-text flex justify-start items-center">
                +966
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
          className=" w-full  px-1 py-2"
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
        className=" w-full rounded-lg border  px-1 py-2"
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

export default function Register() {
  const { formatMessage, locale } = useIntl();
  const { userRegister } = React.useContext(AuthProvider);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const closeError = () => {
    setErrorOpen(false);
  };
  const history = useHistory();
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),

    password: Yup.string()
      .required(formatMessage({ id: 'password-empty' }))
      .min(6, formatMessage({ id: 'password-min-6' }))
      .max(15, formatMessage({ id: 'password-max-15' })),
    fullName: Yup.string().required(formatMessage({ id: 'fullname-empty' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });
  return (
    <div className="register-container">
      <div
        className="h-full"
        style={{
          backgroundImage: `url(${register})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className=" text-gray-900 flex justify-center items-center   h-full relative">
        {errorOpen && (
          <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
        )}
        <div className=" z-2  max-w-screen-xs w-5/6   overflow-hidden">
          <div className="flex items-center flex-col mb-2  rounded-lg ">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className=" mb-3"
                style={{ width: '50px', height: '50px' }}
              />
            </Link>
            <h2 className="text-lg text-center">
              {formatMessage({ id: 'register-on-attiah' })}
            </h2>
          </div>
          <div className="rounded-lg border bg-gray-100 mb-2">
            <Formik
              initialValues={{
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                setErrorOpen(false);
                try {
                  const res = await userRegister(values);
                  if (res === 'ok') {
                    resetForm();
                    history.goBack();
                  }
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
                      label={formatMessage({ id: 'fullname-label' })}
                      name="fullName"
                      value={values.fullName}
                      type="text"
                    />
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
                    <CustomTextInput
                      label={formatMessage({ id: 'email-label' })}
                      name="email"
                      value={values.email}
                      type="email"
                    />

                    <div className="mt-1">
                      <button
                        className={`${
                          isSubmitting
                            ? 'bg-main-color cursor-not-allowed'
                            : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                        } w-full rounded text-sm  p-2 font-semibold  transition duration-150 uppercase `}
                      >
                        {isSubmitting && <BeatLoader size={10} />}
                        {!isSubmitting &&
                          formatMessage({ id: 'register-button' })}
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
          <div className="rounded-lg border">
            <div className="px-3 py-2 ">
              <h1 className="text-sm">
                <FormattedMessage
                  id="already-have-an-account"
                  values={{
                    link: word => (
                      <Link
                        className="text-second-nav-light"
                        to={`/${locale}/app/login`}
                      >
                        {word}
                      </Link>
                    ),
                  }}
                />
              </h1>
            </div>
            <hr />
            <div className="px-3 w-full py-2 ">
              <h1 className="text-xs">
                <FormattedMessage
                  id="terms-of-service"
                  values={{
                    link: word => (
                      <span className="text-second-nav-light">{word}</span>
                    ),
                    tos: word => (
                      <span className="text-second-nav-light">{word}</span>
                    ),
                  }}
                />
              </h1>
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
