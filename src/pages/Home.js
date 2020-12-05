import React from 'react';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';
import MainCarousel from '../components/Home/MainCarousel';

import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
// import PhotoCategories from '../components/Home/PhotoCategories';
import { useMediaQuery } from 'react-responsive';
import Layout from '../components/Layout';
import { useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getHomeItems } from '../Queries/Queries';
import HomeSwiper from '../components/HomeSwiper';
import StaticSwiper from '../components/Swipers/StaticSwiper';
import SwiperLoader from '../components/Home/SwiperLoader';
import { AnimatePresence, motion } from 'framer-motion';
import SideCartMenu from '../components/SingleProduct/SideCartMenu';
import SideCartMenuMobile from '../components/SingleProductMobile/SideCartMenuMobile';
// import AnimatedSlides from '../components/Home/AnimatedSlides';

export default function Home() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width:768px)' });
  const { locale } = useIntl();
  /**
   * Main Fetch
   */

  const { data, isLoading } = useQuery('homeShowcase', getHomeItems, {
    retry: true,
    refetchOnWindowFocus: false,
  });
  const [cartMenuOpen, setCartMenuOpen] = React.useState(false);
  const resolveSwiper = (item, index) => {
    switch (item.type) {
      case 'best_seller':
        return (
          <LazyLoad
            key={index}
            height="calc(100% * 1279/383.44)"
            // placeholder={<Loader height="calc(100% * 1279/383.44)" />}
          >
            <StaticSwiper type={item.key} />
          </LazyLoad>
        );
      case 'product_by_category':
        return (
          <LazyLoad
            key={index}
            height={377}
            // placeholder={<Loader height="377px" />}
          >
            <StaticSwiper type={item.key} />
          </LazyLoad>
        );
      case 'banner':
        return (
          <LazyLoad key={index}>
            <Banner
              url={
                isTabletOrAbove
                  ? item.data.banner_desktop.link
                  : item.data.banner_mobile.link
              }
            />
          </LazyLoad>
        );

      default:
        return null;
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>MRG</title>
        <meta
          name="description"
          content="MRG is the Kuwait homegrown online marketplace. Buy your favourate fashion, beauty, home appliances"
        />
      </Helmet>
      <div
        className={`mb-5 overflow-hidden bg-body-light text-body-text-light
        `}
        style={{ minHeight: 'calc(100vh - 140px)' }}
      >
        <AnimatePresence>
          {cartMenuOpen &&
            (isTabletOrAbove ? (
              <SideCartMenu key="side-cart" setSideMenuOpen={setCartMenuOpen} />
            ) : (
              <SideCartMenuMobile key={998} setSideMenuOpen={setCartMenuOpen} />
            ))}
          {cartMenuOpen && (
            <motion.div
              key="sidecart-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setCartMenuOpen(false)}
              className="side__addCart-bg"
            ></motion.div>
          )}
        </AnimatePresence>
        <MainCarousel />
        <div
          className={` bg-body-light text-body-text-light mt-0 px-2 py-4 sm:px-2 md:px-4 lg:px-8  mx-auto max-w-default`}
        >
          <Categories />
          <StaticSwiper type="electronics" setCartMenuOpen={setCartMenuOpen} />
          <StaticSwiper type="home-kitchen" setCartMenuOpen={setCartMenuOpen} />
          {isLoading && <SwiperLoader />}
          {isLoading && <SwiperLoader />}
          {isLoading && <SwiperLoader />}
          {!isLoading && data.map((i, index) => resolveSwiper(i, index))}
          {!isLoading && data.map((i, index) => resolveSwiper(i, index))}

          {/* <AnimatedSlides
            data={[
              { title: 'iPhone 11', photo: iphonepng },
              { title: 'iPhone Red', photo: iphonered },
              { title: 'iPhone 11', photo: iphonepng },
              { title: 'iPhone Red', photo: iphonered },
            ]}
          /> */}

          {/* <LazyLoad>
            <PhotoCategories data={[homeapp, kitchen, appliances]} />
          </LazyLoad> */}

          {/* <LazyLoad>
            <PhotoCategories data={[men, women, kids]} />
          </LazyLoad> */}
        </div>
      </div>
    </Layout>
  );
}
