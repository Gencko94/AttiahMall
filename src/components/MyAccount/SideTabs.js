import { motion } from 'framer-motion';
import React from 'react';
import { useIntl } from 'react-intl';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Avatar from './Avatar';
export default function SideTabs({ isLightTheme }) {
  const { formatMessage } = useIntl();

  const options = [
    { url: '', name: 'my-profile' },
    { url: '/addresses', name: 'my-addresses' },
    { url: '/orders', name: 'my-orders' },
    { url: '/paymentdetails', name: 'my-payment-details' },
  ];

  const { url } = useRouteMatch();
  return (
    <motion.div initial={false} layout className=" flex flex-col self-start ">
      <Avatar />

      <div
        className={`flex flex-col rounded-lg   overflow-hidden ${
          isLightTheme
            ? 'shadow-itemsSlider-shallow'
            : 'shadow-itemsSlider-wide'
        }`}
      >
        {options.map(option => (
          <div key={option.name}>
            <NavLink
              exact
              className="w-full px-6 py-4 inline-block text-center "
              activeClassName={`${
                isLightTheme
                  ? 'bg-btn-primary-light text-btn-secondary-light font-semibold'
                  : 'bg-btn-primary-dark text-btn-secondary-dark '
              }`}
              to={`${url}${option.url}`}
            >
              {formatMessage({ id: option.name })}
            </NavLink>

            <hr />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
