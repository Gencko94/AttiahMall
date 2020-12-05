import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import LayoutMobile from '../components/LayoutMobile';
import MobileTabs from '../components/MyAccountMobile/MobileTabs';
import MyAddressesMobile from '../components/MyAccountMobile/MyAddressesMobile';
import MyOrdersMobile from '../components/MyAccountMobile/MyOrdersMobile';
import MyProfileMobile from '../components/MyAccountMobile/MyProfileMobile';
import PaymentDetailsMobile from '../components/MyAccountMobile/PaymentDetailsMobile';
export default function MyAccountMobile() {
  const location = useLocation();
  const { path } = useRouteMatch();

  return (
    <LayoutMobile>
      <Helmet>
        <title>My Account | Attiah</title>
      </Helmet>
      <div className="relative">
        <MobileTabs />
        <div style={{ minHeight: 'calc(-120px + 100vh)' }}>
          <AnimatePresence exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route path={`${path}`} exact component={MyProfileMobile} />
              <Route path={`${path}/addresses`} component={MyAddressesMobile} />
              <Route path={`${path}/orders`} component={MyOrdersMobile} />
              <Route
                path={`${path}/paymentdetails`}
                component={PaymentDetailsMobile}
              />
            </Switch>
          </AnimatePresence>
        </div>
      </div>
    </LayoutMobile>
  );
}
