import React from 'react';
import CategoryButton from './CategoryButton';

export default function NavCategoriesContainer({
  isHovering,
  data,
  setDropDownOpen,
  handleDropDownOpen,
  setCatData,
  catData,
  isLoading,
}) {
  React.useEffect(() => {
    if (isHovering && catData) {
      setDropDownOpen(true);
    } else {
      setDropDownOpen(false);
      setCatData(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovering]);
  return (
    <div id="menu-trigger" className="w-full  ">
      <div
        className={` 
          
            bg-nav-cat-light text-nav-cat-text-light
          
         flex items-center  `}
      >
        {!isLoading &&
          data.map(item => (
            <CategoryButton
              key={item.id}
              item={item}
              handleDropDownOpen={handleDropDownOpen}
            />
          ))}
      </div>
    </div>
  );
}
