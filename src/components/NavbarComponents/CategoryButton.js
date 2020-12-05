import React from 'react';

export default function CategoryButton({
  item,
  handleDropDownOpen,
  isLightTheme,
}) {
  return (
    <div
      id={`navButton${item.category}`}
      key={item.category}
      onMouseEnter={() => {
        handleDropDownOpen(item.category);
      }}
      className={`p-2 text-sm  font-semibold cursor-pointer ${
        isLightTheme
          ? 'hover:bg-second-nav-text-light'
          : 'hover:bg-second-nav-dark'
      }`}
    >
      {item.category}
    </div>
  );
}
