import React from 'react';
import { BiCaretRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';
export default function AllCategoriesMegaMenu({ selectedCategory }) {
  const { locale } = useIntl();
  const clipPathHidden =
    locale === 'ar'
      ? 'polygon(99% 0, 100% 0, 100% 100%, 99% 100%)'
      : 'polygon(0 0, 0 0, 0 100%, 0 100%)';
  const clipPathVisible =
    locale === 'ar'
      ? ' polygon(1% 0, 100% 0, 100% 100%, 1% 100%)'
      : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
  const containerVariants = {
    hidden: {
      clipPath: clipPathHidden,
    },
    visible: {
      clipPath: clipPathVisible,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      className={`all-categories__megamenu  bg-white text-nav-cat-text-light ${
        locale === 'ar' ? 'right-100' : 'left-100'
      }  `}
    >
      <div className="">
        <div className="flex justify-between items-center py-2 px-3 ">
          <h1 className=" font-semibold text-sm ">
            {selectedCategory.category}
          </h1>
          <Link
            to="/"
            className="text-sm font-normal hover:text-btn-primary-light hover:underline flex items-center "
          >
            See all {selectedCategory.category}
            <span className="ml-2 ">
              <BiCaretRight />
            </span>
          </Link>
        </div>
        <hr />
        <div className="all-categories__grid p-3 ">
          <div>
            <h1 className="font-bold px-2 py-1">Most Popular</h1>
            {selectedCategory.mostPopular.map((item, i) => {
              return (
                <Link
                  to="/"
                  key={item}
                  className="px-2 py-1  block text-sm hover:text-btn-primary-light"
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div>
            <h1 className="font-bold px-2 py-1">Top Brands</h1>
            {selectedCategory.topBrands.map((item, i) => {
              return (
                <Link
                  to="/"
                  key={i}
                  className="px-2 py-1 text-sm block hover:text-btn-primary-light"
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
