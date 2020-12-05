import React from 'react';

import { BiCaretDown } from 'react-icons/bi';
import { DataProvider } from '../../contexts/DataContext';
import useClickAway from '../../hooks/useClickAway';
export default function OrderFrom({
  px = '2',
  py = '2',
  border = true,
  color = 'gray-900',
}) {
  const {
    selectedStore,
    setSelectedStore,
    flags,
    stores,
    isLightTheme,
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
    if (countryListRef.current) {
      countryListRef.current.classList.replace('scale-0', 'scale-100');
      setCountryListOpen(true);
    }
  };
  return (
    <div
      className={`relative ${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light'
          : 'bg-nav-cat-dark text-nav-cat-text-dark'
      } text-sm`}
    >
      <button
        onClick={toggleCountryList}
        className={`  flex items-center  ${
          border ? 'border-l' : ''
        }  py-${py} px-${px}   hover:shadow-sm transition duration-100`}
      >
        <div className={`flex items-center  mr-1`}>
          <h1 className="font-semibold  mr-1">Order From</h1>
          <img className="w-25p h-25p" src={flags[selectedStore]} alt="flag" />
        </div>
        <BiCaretDown />
      </button>
      <div
        ref={countryListRef}
        className={`absolute p-2 transform z-20 scale-0 mt-1 text-gray-900 font-semibold   ${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        } w-full  overflow-hidden left-0  top-100  transition duration-150 origin-top`}
      >
        {stores.map((country, i) => {
          return (
            <button
              key={i}
              onClick={() => {
                setSelectedStore(country);
                toggleCountryList();
              }}
              className={`p-2 uppercase flex items-center font-semibold transition duration-150  w-full  ${
                isLightTheme
                  ? 'hover:bg-second-nav-light hover:text-second-nav-text-light'
                  : 'hover:bg-body-dark : hover:text-body-text-dark'
              } `}
            >
              <input
                type="checkbox"
                className="form-checkbox rounded-full text-red-500 mr-2"
                checked={selectedStore === country}
                readOnly={true}
              />
              <img
                src={flags[country]}
                className="w-20p h-20p mr-2 "
                alt="uae"
              />
              {country}
            </button>
          );
        })}
      </div>
    </div>
  );
}
