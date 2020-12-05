import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
import { AnimatePresence, motion } from 'framer-motion';
import { useIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';

export default function DeliverTo() {
  const {
    deliveryCountry,
    setDeliveryCountry,
    deliveryCountries,
  } = React.useContext(DataProvider);
  const { locale, formatMessage } = useIntl();
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
  return (
    <div>
      <button
        onClick={toggleCountryList}
        className=" relative flex items-center justify-center rounded-full"
      >
        <LazyLoad>
          <div
            className="mx-2"
            style={{
              position: 'relative',
              backgroundColor: '#f7f7fa',
              paddingBottom: '25px',
              width: '25px',
              borderRadius: '50%',
            }}
          >
            <div className="absolute top-0 left-0">
              <img
                src={`${process.env.REACT_APP_IMAGES_URL}/small/${deliveryCountry?.flag.link}`}
                alt=""
              />
            </div>
          </div>
        </LazyLoad>
      </button>

      <AnimatePresence>
        {countryListOpen && (
          <motion.div
            variants={countryListVariants}
            initial="hidden"
            animate="visible"
            exit="exited"
            ref={countryListRef}
            className={`${locale}-deliver-to__mobile rounded font-semibold 
              
               bg-second-nav-text-light text-second-nav-dark
               
            `}
          >
            <h1 className="p-2 text-center text-sm">
              {formatMessage({ id: 'deliver-to' })}
            </h1>
            <hr />
            {deliveryCountries.map(country => {
              return (
                <button
                  key={country.id}
                  onClick={() => {
                    handleChangeDeliveryCountry(country);
                    toggleCountryList();
                  }}
                  className=" flex p-2  items-center w-full font-semibold text-xs "
                >
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full text-main-color mx-1"
                    checked={deliveryCountry === country}
                    readOnly={true}
                  />
                  <div className="flex">
                    <LazyLoad>
                      <div
                        className="mx-2"
                        style={{
                          position: 'relative',
                          backgroundColor: '#f7f7fa',
                          paddingBottom: '25px',
                          width: '25px',
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

                    <h1 className="text-xs">
                      {country.translation[locale].name}
                    </h1>
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
