import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ data }) {
  const { locale, formatMessage } = useIntl();
  return (
    <div className="flex text-sm py-5 items-center flex-wrap">
      <Link to={`/${locale}`}>{formatMessage({ id: 'home' })}</Link>
      <BiChevronRight />
      {data.map(item => {
        return (
          <div key={item.id} className="flex items-center">
            <Link to={`/${locale}/${item.slug}`}>
              {item.translation[locale].name}
            </Link>
            <BiChevronRight />
          </div>
        );
      })}
    </div>
  );
}
