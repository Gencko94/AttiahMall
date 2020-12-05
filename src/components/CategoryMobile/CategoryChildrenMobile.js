import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

export default function CategoryChildrenMobile({ categoryInfo }) {
  const { locale } = useIntl();
  const history = useHistory();
  return (
    <div className="p-2">
      <ul className=" category-children__grid-mobile">
        {categoryInfo.children.map(item => {
          return (
            <button
              onClick={() => history.push(`/${locale}/categories/${item.slug}`)}
              key={item.id}
              className="w-full p-3 rounded-full text-center category-child__button-mobile font-semibold shadow-navCategory text-main-text "
            >
              {item.translation[locale].name}
            </button>
          );
        })}
      </ul>
    </div>
  );
}
