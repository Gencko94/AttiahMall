import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import { DataProvider } from '../../../contexts/DataContext';
import AllCategoriesMegaMenu from '../AllCategoriesMegaMenu';
import AllCategoriesMenu from '../AllCategoriesMenu';
export default function AllCategories({ dropDownbgRef }) {
  const { allCategories } = React.useContext(DataProvider);
  const [categories, setCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState({});
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const [subCategoriesOpen, setSubCategoriesOpen] = React.useState(false);

  const handleMenuOpen = () => {
    setCategoriesOpen(true);
  };
  const handleMenuClose = () => {
    setCategoriesOpen(false);
    setSubCategoriesOpen(false);
    setSelectedCategory({});
  };
  const handleMegaMenuOpen = categoryName => {
    setSubCategoriesOpen(true);
    setSelectedCategory(categories.find(cat => cat.category === categoryName));
  };

  React.useEffect(() => {
    setCategories(allCategories);
    setSelectedCategory(allCategories[0]);
  }, [allCategories]);

  return (
    <>
      <div
        onMouseEnter={handleMenuOpen}
        onMouseLeave={handleMenuClose}
        className="font-semibold  flex  justify-between py-2 px-4 border-r relative"
        style={{ flexBasis: '250px' }}
      >
        <span className="">All Categories</span>
        <BiCaretDown className="w-5 h-5" />
        <AnimatePresence>
          {categoriesOpen && (
            <AllCategoriesMenu
              categories={categories}
              selectedCategory={selectedCategory}
              handleMegaMenuOpen={handleMegaMenuOpen}
              subCategoriesOpen={subCategoriesOpen}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {subCategoriesOpen && (
            <AllCategoriesMegaMenu
              selectedCategory={selectedCategory}
              subCategoriesOpen={subCategoriesOpen}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
