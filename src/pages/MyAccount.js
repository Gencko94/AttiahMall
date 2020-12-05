import React from 'react';
import Helmet from 'react-helmet';
import SideTabs from '../components/MyAccount/SideTabs';
import MyProfile from '../components/MyAccount/MyProfile';
import MyAddresses from '../components/MyAccount/MyAddresses';
import MyOrders from '../components/MyAccount/MyOrders';
import PaymentDetails from '../components/MyAccount/PaymentDetails';
import { DataProvider } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

export default function MyAccount() {
  const { isLightTheme } = React.useContext(DataProvider);

  const { path } = useRouteMatch();
  const location = useLocation();
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      x: '-100%',
      opacity: 0,
    },
  };

  return (
    <Layout>
      <Helmet>
        <title>My Account | AttiahMall</title>
      </Helmet>
      <div
        className={`relative  overflow-hidden myaccount__grid p-4 pb-3 ${
          isLightTheme
            ? 'bg-body-light text-body-text-light'
            : 'bg-body-dark text-body-text-dark'
        } max-w-default mx-auto`}
        style={{ minHeight: 'calc(-62px + 100vh)' }}
      >
        <SideTabs isLightTheme={isLightTheme} />
        <AnimateSharedLayout>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`rounded-lg overflow-hidden h-full ${
              isLightTheme
                ? 'shadow-itemsSlider-shallow'
                : 'shadow-itemsSlider-wide'
            }`}
          >
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.key}>
                <Route path={`${path}`} exact component={MyProfile} />
                <Route path={`${path}/addresses`} component={MyAddresses} />
                <Route path={`${path}/orders`} component={MyOrders} />
                <Route
                  path={`${path}/paymentdetails`}
                  component={PaymentDetails}
                />
              </Switch>
            </AnimatePresence>
          </motion.div>
        </AnimateSharedLayout>
      </div>
    </Layout>
  );
}
