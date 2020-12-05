import React from 'react';
import { useIntl } from 'react-intl';

export default function CategoryButton({ item, handleDropDownOpen }) {
  const { locale } = useIntl();
  return (
    <div
      id={`navButton${item.category}`}
      onMouseEnter={() => {
        handleDropDownOpen(item.id);
      }}
      className={`p-2 text-sm  font-semibold cursor-pointer 
       
        hover:bg-second-nav-text-light
          
      `}
    >
      {item.translation[locale].name}
    </div>
  );
}
