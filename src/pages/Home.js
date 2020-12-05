import React from 'react';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';
import MainCarousel from '../components/Home/MainCarousel';
import ipad from '../assets/banners/ipad.jpg';
import earbuds from '../assets/banners/earbuds.jpg';
import fashionbanner from '../assets/banners/fashionbanner.gif';
import offer from '../assets/banners/offer.png';
import audiovideo from '../assets/photoCategories/audiovideo.jpg';
import computers from '../assets/photoCategories/computers.jpg';
import mobiles from '../assets/photoCategories/mobiles.jpg';
import tablets from '../assets/photoCategories/tablets.jpg';
import homeapp from '../assets/photoCategories/homeapp.jpg';
import kitchen from '../assets/photoCategories/kitchen.jpg';
import appliances from '../assets/photoCategories/appliances.jpg';
import men from '../assets/photoCategories/men.png';
import women from '../assets/photoCategories/women.png';
import kids from '../assets/photoCategories/kids.png';
// import iphonered from '../assets/phones/iphonered.png';
// import a51 from '../assets/phones/a51.jpg';
// import iphonepng from '../assets/phones/iphonepng.png';
// import note10 from '../assets/phones/note10.jpg';

import ItemsSlider from '../components/Home/ItemsSlider/ItemsSlider';
import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import { DataProvider } from '../contexts/DataContext';
import PhotoCategories from '../components/Home/PhotoCategories';
import { useMediaQuery } from 'react-responsive';
import Layout from '../components/Layout';
import { useIntl } from 'react-intl';
// import AnimatedSlides from '../components/Home/AnimatedSlides';

export default function Home() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  const { formatMessage } = useIntl();
  const { isLightTheme } = React.useContext(DataProvider);

  return (
    <Layout>
      <Helmet>
        <title>AttiahMall</title>
        <meta
          name="description"
          content="AttiahMall is the Saudi homegrown online marketplace. Buy your favourate fashion, beauty, home appliances"
        />
      </Helmet>
      <div
        className={`mb-5 overflow-hidden ${
          isLightTheme
            ? 'bg-body-light text-body-text-light'
            : 'bg-body-dark text-body-text-dark'
        }`}
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        <MainCarousel />
        <div
          className={`${
            isLightTheme
              ? 'bg-body-light text-body-text-light'
              : 'bg-body-dark text-body-text-dark'
          } mt-0 px-2 py-4 sm:px-2 md:px-4 lg:px-8  mx-auto max-w-default`}
        >
          <Categories />
          <ItemsSlider
            type="bestSellers"
            miniLogo={false}
            title={formatMessage({ id: 'bestSellers' })}
            isLightTheme={isLightTheme}
          />
          {!isTabletOrAbove && <Banner img={ipad} />}
          <LazyLoad>
            <PhotoCategories
              data={[mobiles, tablets, computers, audiovideo]}
              title={formatMessage({ id: 'mobilesElectronics' })}
            />
          </LazyLoad>

          {/* <AnimatedSlides
            data={[
              { title: 'iPhone 11', photo: iphonepng },
              { title: 'iPhone Red', photo: iphonered },
              { title: 'iPhone 11', photo: iphonepng },
              { title: 'iPhone Red', photo: iphonered },
            ]}
          /> */}
          <LazyLoad offset={300}>
            <ItemsSlider
              type="phone"
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Save Big with Phones & Tablets"
            />
          </LazyLoad>
          <LazyLoad offset={200}>
            {!isTabletOrAbove && <Banner img={earbuds} />}
          </LazyLoad>
          {isTabletOrAbove && <Banner img={offer} />}
          <LazyLoad>
            <PhotoCategories data={[homeapp, kitchen, appliances]} />
          </LazyLoad>
          <LazyLoad offset={300}>
            <ItemsSlider
              type="home"
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Explore our Household Collection"
            />
          </LazyLoad>
          {/* Fashion Section */}
          {/* <div className="bg-red-200"> */}
          {isTabletOrAbove && <Banner img={fashionbanner} />}
          <LazyLoad>
            <PhotoCategories data={[men, women, kids]} />
          </LazyLoad>
          <LazyLoad offset={300}>
            <ItemsSlider
              type="fashion"
              miniLogo={false}
              isLightTheme={isLightTheme}
              title="Check out the latest fashion trends"
            />
          </LazyLoad>
          {/* </div> */}
        </div>
      </div>
    </Layout>
  );
}
