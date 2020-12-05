import React from 'react';

import FirstSection from './Footer/FirstSection';
import SecondSection from './Footer/SecondSection';
import ThirdSection from './Footer/ThirdSection';
export default function Footer() {
  return (
    <div className="w-full">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  );
}
