import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Layout from '../components/Layout';
import MobileTabs from '../components/MyAccountMobile/MobileTabs';
import MyAddressesMobile from '../components/MyAccountMobile/MyAddressesMobile';
import MyOrdersMobile from '../components/MyAccountMobile/MyOrdersMobile';
import MyProfileMobile from '../components/MyAccountMobile/MyProfileMobile';
export default function MyAccountMobile() {
  const location = useLocation();
  const { path } = useRouteMatch();

  return (
    <Layout>
      <Helmet>
        <title>My Account | AttiahMall</title>
      </Helmet>
      <div className="relative">
        <MobileTabs />
        <div style={{ minHeight: 'calc(-176px + 100vh)' }}>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route path={`${path}`} exact component={MyProfileMobile} />
              <Route path={`${path}/addresses`} component={MyAddressesMobile} />
              <Route path={`${path}/orders`} component={MyOrdersMobile} />
            </Switch>
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
