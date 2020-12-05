import React from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getFooterCategories } from '../../Queries/Queries';

export default function SecondSection() {
  const { locale } = useIntl();
  const { data } = useQuery('footerCategories', getFooterCategories);
  return (
    <div
      className={`px-4 py-2 footer-site-map bg-first-nav-light text-first-nav-text-light `}
    >
      {data &&
        data.slice(0, 5).map(item => {
          return (
            <div key={item.id} className="grid mt-2  gap-1">
              <button className="text-lg font-semibold">
                {item.translation[locale].name}
              </button>
              {item.children.map(sub => {
                return (
                  <button key={sub.id} className="text-sm">
                    {sub.translation[locale].name}
                  </button>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
