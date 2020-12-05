import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

export default function MobileSearchbar({ isLightTheme }) {
  const history = useHistory();
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const { formatMessage } = useIntl();
  const handleSearch = e => {
    if (!searchBarValue) {
      return;
    }
    e.preventDefault();
    history.push(`/search/q=${searchBarValue}`);
  };
  return (
    <div
      className={`${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700 '
          : 'bg-first-nav-light text-nav-cat-text-dark placeholder-gray-500 shadow-itemsSlider-shallow'
      } rounded flex items-center overflow-hidden flex-1 `}
    >
      <div
        className={`${
          isLightTheme
            ? 'bg-nav-cat-light text-nav-cat-text-light'
            : 'bg-nav-cat-dark text-nav-cat-text-dark'
        }  p-1  `}
      >
        <BiSearch className=" w-5 h-5 " />
      </div>
      <form onSubmit={handleSearch} className="flex-1">
        <input
          value={searchBarValue}
          onChange={e => setSearchBarValue(e.target.value)}
          type="search"
          className={` ${
            isLightTheme
              ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
              : 'bg-first-nav-light text-nav-cat-text-dark placeholder-gray-500'
          } p-1 w-full `}
          placeholder={formatMessage({ id: 'nav.search.placeholder' })}
        />
      </form>
    </div>
  );
}
