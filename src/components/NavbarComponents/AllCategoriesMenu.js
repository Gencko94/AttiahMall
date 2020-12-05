import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
export default function AllCategoriesMenu({
  categories,
  selectedCategory,
  handleMegaMenuOpen,
}) {
  const containerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: '500px',
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.1,
        ease: 'linear',
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'tween',
        duration: 0.1,
        ease: 'linear',
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      className={` all-categories__menu bg-nav-cat-light text-nav-cat-text-light text-sm`}
    >
      <div className=" ">
        {categories.map((item, i) => {
          return (
            <Link
              to="/"
              key={i}
              onMouseEnter={() => handleMegaMenuOpen(item.category)}
              className={`px-4 py-2 font-semibold block ${
                selectedCategory.category === item.category && 'bg-white'
              }`}
            >
              {item.category}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
