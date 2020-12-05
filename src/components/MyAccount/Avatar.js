import { motion } from 'framer-motion';
import React from 'react';
import guest from '../../assets/svgs/guest.svg';
export default function Avatar() {
  return (
    <motion.div className="flex mb-4 rounded-lg  p-2 border shadow-itemsSlider-shallow overflow-hidden ">
      <div className="" style={{ flexBasis: '20%' }}>
        <img src={guest} alt="user" />
      </div>
      <div className="flex flex-col font-semibold mx-2 ">
        <h1>John Doe</h1>
        <h1 className="text-xs">John@Doe.com</h1>
      </div>
    </motion.div>
  );
}
