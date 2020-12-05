import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { BiCaretDown } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import LazyLoad from 'react-lazyload';
export default function ShipTo() {
  const {
    deliveryCountry,
    deliveryCountries,
    deliveryCountriesLoading,
    setDeliveryCountry,
  } = React.useContext(DataProvider);

  const [countryListOpen, setCountryListOpen] = React.useState(false);
  const countryListRef = React.useRef(null);
  useClickAway(countryListRef, () => {
    if (countryListOpen) {
      setCountryListOpen(false);
    }
  });
  const toggleCountryList = () => {
    setCountryListOpen(!countryListOpen);
  };
  const { formatMessage, locale } = useIntl();

  const countryListVariants = {
    hidden: {
      height: 0,
    },
    visible: {
      height: 'auto',
      transition: {
        type: 'tween',
      },
    },
    exited: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  const handleChangeDeliveryCountry = country => {
    localStorage.setItem(
      'deliveryCountry',
      JSON.stringify({
        deliveryCountry: {
          en: country.translation.en.name,
          ar: country.translation.ar.name,
        },
      })
    );
    setDeliveryCountry(country);
  };
  return (
    <div className="relative">
      {deliveryCountriesLoading && (
        <div className="p-1">
          <Loader
            type="ThreeDots"
            color="#fff"
            secondaryColor="black"
            height={20}
            width={20}
            visible={true}
          />
        </div>
      )}
      {!deliveryCountriesLoading && (
        <button
          onClick={toggleCountryList}
          className=" p-1 flex items-center rounded hover:bg-main-color  transition duration-100"
        >
          <h1 className="text-sm uppercase ">
            {formatMessage({ id: 'nav.shipTo' })}
          </h1>
          <LazyLoad>
            <div
              className="mx-2"
              style={{
                position: 'relative',
                backgroundColor: '#f7f7fa',
                paddingBottom: '20px',
                width: '20px',
                borderRadius: '50%',
              }}
            >
              <div className="absolute top-0 left-0">
                <img
                  src={`${process.env.REACT_APP_IMAGES_URL}/small/${deliveryCountry.flag.link}`}
                  alt=""
                />
              </div>
            </div>
          </LazyLoad>

          <BiCaretDown />
        </button>
      )}

      <AnimatePresence>
        {countryListOpen && (
          <motion.div
            variants={countryListVariants}
            initial="hidden"
            animate="visible"
            exit="exited"
            ref={countryListRef}
            className="deliver-to__desktop text-body-text-light font-semibold   bg-gray-100"
          >
            {deliveryCountries.map(country => {
              return (
                <button
                  key={country.id}
                  onClick={() => {
                    handleChangeDeliveryCountry(country);
                    toggleCountryList();
                  }}
                  className={`p-4 text-sm flex w-full uppercase items-center font-semibold  text-nav-primary hover:bg-main-color hover:text-main-text`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full text-main-color mx-1"
                    checked={
                      deliveryCountry.translation[locale].name ===
                      country.translation[locale].name
                    }
                    readOnly={true}
                  />
                  <div className="flex">
                    <LazyLoad>
                      <div
                        className="mx-2"
                        style={{
                          position: 'relative',
                          backgroundColor: '#f7f7fa',
                          paddingBottom: '20px',
                          width: '20px',
                          borderRadius: '50%',
                        }}
                      >
                        <div className="absolute top-0 left-0">
                          <img
                            src={`${process.env.REACT_APP_IMAGES_URL}/small/${country.flag.link}`}
                            alt={country.code}
                          />
                        </div>
                      </div>
                    </LazyLoad>

                    <h1>{country.translation[locale].name}</h1>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
