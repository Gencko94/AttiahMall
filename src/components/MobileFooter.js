import React from 'react';

import FirstSection from './MobileFooter/FirstSection';
import SecondSection from './MobileFooter/SecondSection';
import ThirdSection from './MobileFooter/ThirdSection';

export default function MobileFooter() {
  return (
    <div className="w-full">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </div>
  );
}
