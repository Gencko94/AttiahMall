import axios from 'axios';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import { BiSearch } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { DataProvider } from '../../contexts/DataContext';
import theme from './theme.module.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
let cancelToken = undefined;
export default function SearchBar() {
  const { isLightTheme } = React.useContext(DataProvider);
  const [searchBarValue, setSearchBarValue] = React.useState('');
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const { formatMessage, locale } = useIntl();

  //with controlling the arrows
  const getSuggestionValue = suggestion => {
    return suggestion.translation[locale].title;
  };

  const renderSuggestion = (suggestion, { isHighlighted }) => {
    return (
      <div className={`p-2 ${isHighlighted && 'bg-gray-300 rounded'}`}>
        {suggestion.translation[locale].title}
      </div>
    );
  };
  const onSuggestionsFetchRequested = async ({ value }) => {
    if (cancelToken) {
      cancelToken.cancel();
    }
    cancelToken = axios.CancelToken.source();
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    if (inputLength < 2) return [];
    setLoading(true);
    try {
      const res = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_MAIN_URL}/search-products`,
        params: { value: value, page: 1 },
        cancelToken: cancelToken.token,
      });
      console.log(res.data.data.data);
      if (res) {
        setData(res.data.data.data);
        setLoading(false);
      }
    } catch (error) {
      if (axios.isCancel(error)) return [];
    }
  };
  const onSuggestionsClearRequested = () => {
    setData([]);
  };
  const renderSuggestionsContainer = ({ containerProps, children }) => {
    return (
      <div
        {...containerProps}
        className="absolute  left-0 bg-body-light w-full rounded"
        style={{ top: '110%' }}
      >
        {children}
      </div>
    );
  };
  const renderInputComponent = inputProps => {
    return (
      <input
        {...inputProps}
        className={`w-full p-2
            ${
              isLightTheme
                ? 'bg-nav-cat-light text-nav-cat-text-light placeholder-gray-700'
                : 'bg-nav-cat-dark text-nav-cat-text-dark placeholder-gray-500'
            }  `}
      />
    );
  };
  const handleSelect = (event, { suggestion }) => {
    console.log(suggestion);
  };
  return (
    <div
      className={`flex rounded items-center relative  ${
        isLightTheme
          ? 'bg-nav-cat-light text-nav-cat-text-light'
          : 'bg-nav-cat-dark text-nav-cat-text-dark'
      }  mx-4 flex-1  `}
    >
      <button className=" p-2   bg-nav-cat-light  ">
        <BiSearch className=" w-5 h-5" />
      </button>
      <span className="border-r"></span>
      <Autosuggest
        theme={theme}
        inputProps={{
          value: searchBarValue,
          placeholder: formatMessage({ id: 'nav.search.placeholder' }),
          onChange: (e, { newValue }) => setSearchBarValue(newValue),
        }}
        renderInputComponent={renderInputComponent}
        suggestions={data}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        renderSuggestion={renderSuggestion}
        getSuggestionValue={getSuggestionValue}
        renderSuggestionsContainer={renderSuggestionsContainer}
        onSuggestionSelected={handleSelect}
      />
      <div>
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={30}
          width={30}
          visible={isLoading}
        />
      </div>
    </div>
  );
}
