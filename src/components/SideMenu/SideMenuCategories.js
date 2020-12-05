import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useIntl } from 'react-intl';

export default function SideMenuCategories({
  categories,
  subCategory,
  secondSubPage,
  handleClickBackFirst,
  handleClickBackSecond,
  handleClickNextFirst,
  handleClickNextSecond,
}) {
  const { formatMessage, locale } = useIntl();
  return (
    <>
      <div className="sidebar-page">
        <button
          onClick={handleClickBackFirst}
          className="py-2 px-2 mb-2 font-semibold uppercase"
        >
          {formatMessage({ id: 'go-back' })}
        </button>
        <hr />
        {categories.map((category, i) => {
          return (
            <button
              onClick={() => handleClickNextFirst(i)}
              key={category.id}
              className="py-2 px-2 mb-2 flex items-center  justify-between"
            >
              <h1>{category.translation[locale].name}</h1>

              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </button>
          );
        })}
      </div>
      <div className="sidebar-page">
        <button
          onClick={() => handleClickBackSecond(subCategory)}
          className="py-2 px-2 mb-2 font-semibold uppercase"
        >
          {formatMessage({ id: 'go-back' })}
        </button>
        <hr />
        {categories[subCategory].children.map((subCategory, i) => {
          return (
            <button
              onClick={() => handleClickNextSecond(i)}
              key={i}
              className="py-2 px-2 mb-2 flex items-center  justify-between"
            >
              <h1>{subCategory.translation[locale].name}</h1>
              {locale === 'ar' ? <BsChevronLeft /> : <BsChevronRight />}
            </button>
          );
        })}
      </div>
    </>
  );
}
