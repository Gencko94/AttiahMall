import { Formik, useField } from 'formik';
import React from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import logo from '../assets/attiah.png';
import useClickAway from '../hooks/useClickAway';
import * as Yup from 'yup';
import ErrorSnackbar from '../components/ErrorSnackbar';
import { AuthProvider } from '../contexts/AuthContext';
import Language from '../components/NavbarComponents/Language';
import { useMediaQuery } from 'react-responsive';
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
      <label htmlFor={name} className={`font-semibold text-gray-800 mb-1`}>
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

export default function PasswordReset() {
  const { userLogin } = React.useContext(AuthProvider);
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { formatMessage } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();
  const closeError = () => {
    setErrorOpen(false);
  };
  const validationSchema = Yup.object({
    email: Yup.string().email(formatMessage({ id: 'email-validation' })),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
    password: Yup.string().required(formatMessage({ id: 'password-empty' })),
  });
  return (
    <div className=" text-gray-900 flex justify-center items-center   h-screen relative">
      {errorOpen && (
        <ErrorSnackbar message={errorMessage} closeFunction={closeError} />
      )}
      <div className=" z-2  max-w-screen-sm w-5/6   overflow-hidden">
        <div className="flex items-center flex-col mb-4  rounded-lg text-center ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className=" mb-3"
              style={{ width: '50px', height: '50px' }}
            />
          </Link>
          <h2 className="text-xl mb-2 text-center font-semibold">
            {formatMessage({ id: 'password-reset' })}
          </h2>
          <h1>{formatMessage({ id: 'password-reset-enter-your-email' })}</h1>
        </div>
        <div className="rounded-lg border bg-gray-100 mb-2">
          <Formik
            initialValues={{
              phoneNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              setErrorOpen(false);
              try {
                const res = await userLogin(values);
                if (res === 'ok') {
                } else {
                  actions.setSubmitting(false);
                }
              } catch (error) {
                setErrorOpen(true);
                setErrorMessage('Something went wrong, Please try again');
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

                  <div className=" py-1 mt-2">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={`${
                        isSubmitting
                          ? 'bg-main-color cursor-not-allowed'
                          : 'bg-main-color text-second-nav-text-light hover:bg-red-800'
                      } w-full rounded uppercase  p-2 font-semibold  transition duration-150 `}
                    >
                      {isSubmitting && <BeatLoader size={10} />}
                      {!isSubmitting &&
                        formatMessage({ id: 'password-reset-send-button' })}
                    </button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div
        className={`${
          isTabletOrAbove
            ? 'credentials-language__container'
            : 'credentials-language__container-mobile'
        }`}
      >
        <Language />
      </div>
      <div
        className={`${
          isTabletOrAbove
            ? 'credentials-back-button__container'
            : 'credentials-back-button__container-mobile'
        }`}
      >
        <button onClick={() => history.goBack()}>
          <AiOutlineArrowLeft className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
