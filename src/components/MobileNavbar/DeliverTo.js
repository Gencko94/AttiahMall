import React from 'react';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
import { AnimatePresence, motion } from 'framer-motion';
import { useIntl } from 'react-intl';

export default function DeliverTo() {
  const {
    deliveryCountry,
    setDeliveryCountry,
    flags,
    countries,
    isLightTheme,
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
  const countryListVariants = {
    hidden: {
      height: 0,
    },
    visible: {
      height: 'auto',
    },
    exited: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  return (
    <div className=" p-1">
      <button
        onClick={toggleCountryList}
        className=" relative flex items-center justify-center rounded-full"
      >
        <img src={flags[deliveryCountry]} className="w-25p h-25p" alt="uae" />
      </button>

      <AnimatePresence>
        {countryListOpen && (
          <motion.div
            variants={countryListVariants}
            initial="hidden"
            animate="visible"
            exit="exited"
            ref={countryListRef}
            className={`${locale}-deliver-to__mobile rounded font-semibold ${
              isLightTheme
                ? 'bg-second-nav-text-light text-second-nav-dark'
                : 'bg-second-nav-dark text-second-nav-text-dark'
            }`}
          >
            <h1 className="p-2 text-center text-sm">
              {formatMessage({ id: 'deliver-to' })}
            </h1>
            <hr />
            {countries.map(country => {
              return (
                <button
                  key={country}
                  onClick={() => {
                    setDeliveryCountry(country);
                    toggleCountryList();
                  }}
                  className=" flex p-2  items-center w-full font-semibold text-xs "
                >
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full text-red-500 mx-1"
                    checked={deliveryCountry === country}
                    readOnly={true}
                  />
                  <img
                    src={flags[country]}
                    className="w-25p h-25p mx-2 "
                    alt="uae"
                  />
                  <h1 className="uppercase">{country}</h1>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
