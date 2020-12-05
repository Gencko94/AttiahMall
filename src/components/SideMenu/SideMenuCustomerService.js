import React from 'react';
import { useIntl } from 'react-intl';

export default function SideMenuCustomerService({ handleHideCustomerService }) {
  const { formatMessage } = useIntl();
  return (
    <div className="sidebar-page">
      <button
        onClick={handleHideCustomerService}
        className="py-2 px-2 mb-2 font-semibold uppercase  "
      >
        {formatMessage({ id: 'go-back' })}
      </button>
      <hr />
      <div>Customer service info here</div>
    </div>
  );
}
