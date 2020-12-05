import React from 'react';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function Desktop({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
