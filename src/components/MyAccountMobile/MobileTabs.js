import React from 'react';
import { useIntl } from 'react-intl';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { DataProvider } from '../../contexts/DataContext';

export default function MobileTabs() {
  const { formatMessage } = useIntl();
  const { url } = useRouteMatch();
  const { isLightTheme } = React.useContext(DataProvider);
  const options = [
    { url: '', name: 'my-profile' },
    { url: '/addresses', name: 'my-addresses' },
    { url: '/orders', name: 'my-orders' },
    { url: '/paymentdetails', name: 'my-payment-details' },
  ];

  return (
    <div className="overflow-hidden">
      <ul className=" mobile-tabs overflow-x-scroll  whitespace-no-wrap bg-red-100 p-2">
        {options.map(option => {
          return (
            <li key={option.name} className="inline-block mx-1  ">
              <NavLink
                exact
                className="w-full p-3 rounded inline-block text-center "
                activeClassName={`${
                  isLightTheme
                    ? 'bg-btn-primary-light text-btn-secondary-light font-semibold'
                    : 'bg-btn-primary-dark text-btn-secondary-dark '
                }`}
                to={`${url}${option.url}`}
              >
                {formatMessage({ id: option.name })}
              </NavLink>
            </li>
            // <li key={i} className="inline-block mx-1  ">
            //   <button
            //     onClick={() => history.push(`${mapNametoPage[option]}`)}
            //     className={`p-3 ${
            //       selectedIndex === i ? 'bg-red-700 text-white' : 'bg-red-100'
            //     } hover:bg-red-700 hover:text-white transition duration-150  rounded`}
            //   >
            //     {formatMessage({ id: option })}
            //   </button>
            // </li>
          );
        })}
      </ul>
    </div>
  );
}
