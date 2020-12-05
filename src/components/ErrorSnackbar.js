import { motion } from 'framer-motion';
import React from 'react';
import { MdClose } from 'react-icons/md';
export default function ErrorSnackbar({ message, closeFunction }) {
  const containerVariants = {
    hidden: {
      y: '20px',
      x: '-50%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
    },
    exited: {
      y: 20,
      opacity: 0,
    },
  };
  console.log('hi');
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exited"
      className="snackbar__error bg-main-color text-main-text rounded font-semibold flex text-sm"
    >
      <h1 className="mx-3">{message}</h1>
      <button onClick={closeFunction} className="mx-3">
        <MdClose className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
