import React from 'react';
import { BiChevronRight } from 'react-icons/bi';

export default function Breadcrumbs() {
  return (
    <div className="flex text-sm py-5 items-center flex-wrap">
      <h1>Home</h1>
      <BiChevronRight />
      <h1>Home & Garden</h1>
      <BiChevronRight />
      <h1>Bathroom & Laundry</h1>
      <BiChevronRight />
      <h1>Drying Racks & Pegs</h1>
    </div>
  );
}
