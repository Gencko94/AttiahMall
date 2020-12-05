import React from 'react';
import { useIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';

export default function SideMenuDeliveryCountries({
  handleHideDeliveryCountries,
  deliveryCountries,
  deliveryCountry,
  setDeliveryCountry,
}) {
  const { formatMessage, locale } = useIntl();
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
    <div className="sidebar-page">
      <button
        onClick={handleHideDeliveryCountries}
        className="py-2 px-2 mb-2 font-semibold uppercase  "
      >
        {formatMessage({ id: 'go-back' })}
      </button>
      <hr />
      <div>
        {deliveryCountries.map(country => {
          return (
            <button
              key={country.id}
              onClick={() => {
                handleChangeDeliveryCountry(country);
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
                      paddingBottom: '30px',
                      width: '30px',
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
      </div>
    </div>
  );
}
