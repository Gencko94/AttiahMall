import React from 'react';
import Logo from './Logo';
import NavIcons from './NavIcons';
import SearchBar from './SearchBar';

export default function SecondNav() {
  return (
    <div
      className={`z-20 sticky top-0 left-0 bg-second-nav-light text-second-nav-text-light py-2  `}
    >
      <div className="max-w-default mx-auto flex items-center  justify-between px-6">
        <Logo />
        <SearchBar />
        <NavIcons />
      </div>
    </div>
  );
}
