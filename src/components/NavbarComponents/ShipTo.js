import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { BiCaretDown } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
export default function ShipTo() {
  const {
    deliveryCountry,
    setDeliveryCountry,
    flags,
    countries,
  } = React.useContext(DataProvider);

  const [countryListOpen, setCountryListOpen] = React.useState(false);
  const countryListRef = React.useRef(null);
  useClickAway(countryListRef, () => {
    if (countryListOpen) {
      countryListRef.current.classList.replace('scale-100', 'scale-0');
      setCountryListOpen(false);
    }
  });
  const toggleCountryList = () => {
    setCountryListOpen(!countryListOpen);
  };
  const { formatMessage } = useIntl();

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
    <div className="relative">
      <button
        onClick={toggleCountryList}
        className=" p-1 flex items-center rounded hover:bg-main-color  transition duration-100"
      >
        <h1 className="text-sm uppercase ">
          {formatMessage({ id: 'nav.shipTo' })}
        </h1>
        <img
          src={flags[deliveryCountry]}
          className="w-20p h-20p mx-2 "
          alt="uae"
        />
        <BiCaretDown />
      </button>
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
            {countries.map(country => {
              return (
                <button
                  key={country}
                  onClick={() => {
                    setDeliveryCountry(country);
                    toggleCountryList();
                  }}
                  className={`py-2 flex px-1 uppercase items-center font-semibold  w-full text-nav-primary hover:bg-second-nav-light hover:text-second-nav-text-light`}
                >
                  <input
                    type="checkbox"
                    className="form-checkbox rounded-full text-red-500 mx-1"
                    checked={deliveryCountry === country}
                    readOnly={true}
                  />
                  <img
                    src={flags[country]}
                    className="w-20p h-20p mx-2 "
                    alt="uae"
                  />
                  <h1>{country}</h1>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
