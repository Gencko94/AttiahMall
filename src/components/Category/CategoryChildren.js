import React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import Ink from 'react-ink';
export default function CategoryChildren({
  categoryInfo,
  categoryInfoLoading,
}) {
  const history = useHistory();
  const { locale } = useIntl();
  if (categoryInfoLoading) {
    return <div>loading...</div>;
  }
  return (
    <div className="flex items-center justify-center flex-wrap">
      {categoryInfo.children.map(child => {
        return (
          <button
            onClick={() => history.push(`/${locale}/categories/${child.slug}`)}
            className="rounded-full category-child__button relative my-1 mx-2 px-2 py-4 flex items-center justify-center text-main-text text-center font-semibold "
            style={{
              width: '100px',
              height: '100px',
            }}
          >
            <Ink background={true} />
            {child.translation[locale].name}
          </button>
        );
      })}
    </div>
  );
}
