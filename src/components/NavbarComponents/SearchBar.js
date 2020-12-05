import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';
// import OrderFrom from './OrderFrom';

export default function SearchBar() {
  const { isLightTheme } = React.useContext(DataProvider);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const history = useHistory();
  const { formatMessage, locale } = useIntl();
  const handleSearch = e => {
    if (!searchBarValue) {
      return;
    }
    e.preventDefault();
    history.push(`/${locale}/search/q=${searchBarValue}`);
  };
  return (
    <div
      className={`flex     rounded overflow-hidden  relative  ${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light'
          : 'bg-nav-cat-dark text-nav-cat-text-dark'
      }  mx-4 flex-1  `}
    >
      <button onClick={handleSearch} className=" p-2  bg-nav-cat-light  ">
        <BiSearch className=" w-5 h-5" />
      </button>
      <span className="border-r"></span>
      <form className="w-full p-2 " onSubmit={handleSearch}>
        <input
          className={`w-full    ${
            isLightTheme
              ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
              : 'bg-nav-cat-dark text-nav-cat-text-dark placeholder-gray-500'
          }  `}
          type="text"
          placeholder={formatMessage({ id: 'nav.search.placeholder' })}
          value={searchBarValue}
          onChange={e => setSearchBarValue(e.target.value)}
        />
      </form>
      {/* <OrderFrom /> */}
    </div>
  );
}
