import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import usePlacesAutoComplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import AutoSuggest from 'react-autosuggest';
import { MdLocationOn } from 'react-icons/md';
import { useIntl } from 'react-intl';
import ErrorSnackbar from '../../../ErrorSnackbar';
export default function PlacesSearch({ panTo, markerAddress }) {
  const { formatMessage, locale } = useIntl();
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const closeErrorDialog = () => {
    setErrorOpen(false);
  };
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data, loading },

    clearSuggestions,
  } = usePlacesAutoComplete({
    requestOptions: {
      location: {
        lat: () => 29.3759,
        lng: () => 47.9774,
      },
      radius: 60 * 1000,
    },
  });
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
      setErrorOpen(true);
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };
  const locationSuccess = position => {
    const { latitude, longitude } = position.coords;
    panTo({ lat: latitude, lng: longitude });
  };

  const locationError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setErrorOpen(true);
        setErrorMessage('User Denied the request for Geolocation. ');
        break;
      case error.POSITION.UNAVAILABLE:
        setErrorOpen(true);
        setErrorMessage('Location information is Unavailable ');
        break;
      case error.TIMEOUT:
        setErrorOpen(true);
        setErrorMessage('The Request to get user location was timed out. ');
        break;
      case error.UNKNOWN_ERROR:
        setErrorOpen(true);
        setErrorMessage('An Unknown Error has Occured.');
        break;

      default:
        setErrorOpen(true);
        setErrorMessage('An Unknown Error has Occured.');
    }
  };
  const handleClick = async (e, { suggestion }) => {
    try {
      const results = await getGeocode({ address: suggestion.description });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    if (markerAddress) {
      setValue(markerAddress, false);
    }
  }, [markerAddress, setValue]);

  const renderSuggestions = (data, { query, isHighlighted }) => {
    return (
      status === 'OK' && (
        <div
          className={`py-1 px-2 text-sm ${
            isHighlighted
              ? 'bg-gray-400 text-body-text-light'
              : 'bg-body-light text-gray-600'
          }`}
        >
          <div className="flex items-center">
            <span className="mx-1">
              <MdLocationOn className="w-5 h-5 text-main-color" />
            </span>
            <h1>{data.description}</h1>
          </div>
        </div>
      )
    );
  };
  return (
    <>
      {errorOpen && (
        <ErrorSnackbar
          message={errorMessage}
          closeFunction={closeErrorDialog}
        />
      )}
      <div className="absolute z-3 top-0 " style={{ width: '96%', left: '2%' }}>
        <div
          style={{ position: 'absolute', top: '19px' }}
          className={`${locale === 'ar' ? 'left-10' : 'right-10'}`}
        >
          <PulseLoader size={7} color={'#b72b2b'} loading={loading} />
        </div>
        <AutoSuggest
          inputProps={{
            placeholder: formatMessage({ id: 'search-for-an-area' }),
            autoComplete: 'off',
            name: 'search',
            disabled: !ready,
            className:
              'placeholder-gray-700 bg-body-light w-full p-2 border rounded mt-2 shadow-itemsSlider-shallow',
            value: value,
            onChange: (e, { newValue, method }) => {
              if (
                method === 'down' ||
                method === 'up' ||
                method === 'click' ||
                method === 'enter'
              ) {
                setValue(newValue, false);
              } else {
                setValue(newValue);
              }
            },
          }}
          suggestions={data}
          onSuggestionsFetchRequested={value => {
            return null;
          }}
          onSuggestionsClearRequested={() => {
            clearSuggestions();
          }}
          getSuggestionValue={data => {
            return data.description;
          }}
          renderSuggestion={renderSuggestions}
          highlightFirstSuggestion={true}
          onSuggestionSelected={handleClick}
        />
      </div>
      <button
        onClick={getLocation}
        className="z-2 flex items-center absolute text-sm py-2 px-4 bg-main-color font-bold text-main-text rounded-full"
        style={{ left: '2%', top: '65px' }}
      >
        <h1>{formatMessage({ id: 'find-my-position' })}</h1>
        <MdLocationOn className="w-5 h-5" />
      </button>
    </>
  );
}
