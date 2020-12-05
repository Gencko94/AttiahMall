import React from 'react';

export default function SecondSection() {
  return (
    <div className="px-4 py-2 footer-site-map__mobile  bg-gray-900 text-main-text">
      <div className="grid grid-cols-1 mt-2  gap-1">
        <button className="text-lg font-semibold">Electronics</button>
        <button className="text-sm">Mobiles</button>
        <button className="text-sm">Tablets</button>
        <button className="text-sm">Laptops</button>
        <button className="text-sm">Home Appliances</button>
        <button className="text-sm">Camera,Photo & Video</button>
        <button className="text-sm">TVs</button>
        <button className="text-sm">Headphones</button>
        <button className="text-sm">Videogames</button>
      </div>
      <div className="grid mt-2 gap-1">
        <button className="text-lg font-semibold">Fashion</button>
        <button className="text-sm">Women Fashion</button>
        <button className="text-sm">Men Fashion</button>
        <button className="text-sm">Girls Fashion </button>
        <button className="text-sm">Boys Fashion</button>
        <button className="text-sm">Watches</button>
        <button className="text-sm">Jewellary</button>
        <button className="text-sm">Handbags</button>
      </div>
      <div className="grid mt-2 gap-1 ">
        <button className="text-lg font-semibold">Home and Kit</button>
        <button className="text-sm">Bath</button>
        <button className="text-sm">Home Decor</button>
        <button className="text-sm">Kitchen & Dining</button>
        <button className="text-sm">Tools & Home Improvements</button>
        <button className="text-sm">Furniture</button>
        <button className="text-sm">Pet Supplies</button>
      </div>
      <div className="grid mt-2 gap-1 ">
        <button className="text-lg font-semibold">Baby</button>
        <button className="text-sm">Strollers & Prams</button>
        <button className="text-sm">Car Seats</button>
        <button className="text-sm">Feeding</button>
        <button className="text-sm">Bathing & Skincare</button>
        <button className="text-sm"> Diapering</button>
        <button className="text-sm">Baby Cloting & Shoes</button>
        <button className="text-sm">Baby & Toddler Toys</button>
      </div>
    </div>
  );
}
