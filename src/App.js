import React, { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryMobile from './pages/CategoryMobile';
import GuestCheckOut from './pages/GuestCheckOut';
import GuestCheckOutMobile from './pages/GuestCheckOutMobile';
import Register from './pages/Register';
import Login from './pages/Login';
import ScrollToTopOnMount from './helpers/ScrollToTopOnMount';
import { LocalizedSwitch, LocalizedRouter, appStrings } from './modules/i18n/';
import { appLanguages } from './modules/const';
import Loading from './helpers/Loading';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Test from './pages/test';
import RegisterMobile from './pages/RegisterMobile';
import LoginMobile from './pages/LoginMobile';
import PasswordReset from './pages/PasswordReset';
import { ReactQueryDevtools } from 'react-query-devtools';
// import Loadable from 'react-loadable';

// const Home = Loadable({
//   loader: () => import('./pages/Home'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const MyAccount = Loadable({
//   loader: () => import('./pages/MyAccount'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const MyAccountMobile = Loadable({
//   loader: () => import('./pages/MyAccountMobile'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const SingleProduct = Loadable({
//   loader: () => import('./pages/SingleProduct'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const SingleProductMobile = Loadable({
//   loader: () => import('./pages/SingleProductMobile'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const Cart = Loadable({
//   loader: () => import('./pages/Cart'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const CartMobile = Loadable({
//   loader: () => import('./pages/CartMobile'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })
// const Category = Loadable({
//   loader: () => import('./pages/Category'),
//   loading() {
//     return <div>loading</div>
//   },
//   delay:2000
// })

const Home = React.lazy(() => import('./pages/Home'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));
const MyAccountMobile = React.lazy(() => import('./pages/MyAccountMobile'));
const SingleProduct = React.lazy(() => import('./pages/SingleProduct'));
const SingleProductMobile = React.lazy(() =>
  import('./pages/SingleProductMobile')
);
const Cart = React.lazy(() => import('./pages/Cart'));
const CartMobile = React.lazy(() => import('./pages/CartMobile'));

const Category = React.lazy(() => import('./pages/Category'));
const ViewedItems = React.lazy(() => import('./pages/ViewedItems'));
const ViewedItemsMobile = React.lazy(() => import('./pages/ViewedItemsMobile'));
const Wishlist = React.lazy(() => import('./pages/Wishlist'));
const WishlistMobile = React.lazy(() => import('./pages/WishlistMobile'));
const Checkout = React.lazy(() => import('./pages/Checkout'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const NotFoundMobile = React.lazy(() => import('./pages/NotFoundMobile'));

function App() {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <Suspense fallback={<Loading />}>
      <LocalizedRouter
        RouterComponent={Router}
        languages={appLanguages}
        appStrings={appStrings}
      >
        <ScrollToTopOnMount />

        <LocalizedSwitch>
          <Route
            path="/app/register"
            render={props => {
              if (isTabletOrAbove) {
                return <Register {...props} />;
              } else {
                return <RegisterMobile {...props} />;
              }
            }}
          />
          <Route
            path="/app/login"
            render={props => {
              if (isTabletOrAbove) {
                return <Login {...props} />;
              } else {
                return <LoginMobile {...props} />;
              }
            }}
          />

          <Route exact path="/app/password-reset" component={PasswordReset} />
          <Route exact path="/" component={Home} />

          <ProtectedRoute
            path="/user/account"
            Component={isTabletOrAbove ? MyAccount : MyAccountMobile}
          />

          <ProtectedRoute
            path="/wishlist"
            Component={isTabletOrAbove ? Wishlist : WishlistMobile}
          />

          <Route
            path="/cart"
            render={props => {
              if (isTabletOrAbove) {
                return <Cart {...props} />;
              } else {
                return <CartMobile {...props} />;
              }
            }}
          />

          <Route
            exact
            path="/vieweditems"
            render={props => {
              if (isTabletOrAbove) {
                return <ViewedItems {...props} />;
              } else {
                return <ViewedItemsMobile {...props} />;
              }
            }}
          />

          <Route
            path="/categories/:category"
            render={props => {
              if (isTabletOrAbove) {
                return <Category {...props} />;
              } else {
                return <CategoryMobile {...props} />;
              }
            }}
          />

          <Route
            path="/checkout/guest-checkout"
            render={props => {
              if (isTabletOrAbove) {
                return <GuestCheckOut {...props} />;
              } else {
                return <GuestCheckOutMobile {...props} />;
              }
            }}
          />
          <ProtectedRoute
            path="/checkout"
            Component={isTabletOrAbove ? Checkout : MyAccountMobile}
          />
          <Route path="/test" component={Test} />
          <Route
            exact
            path="/:category/:id"
            render={props => {
              if (isTabletOrAbove) {
                return <SingleProduct {...props} />;
              } else {
                return <SingleProductMobile {...props} />;
              }
            }}
          />
          <Route
            render={props => {
              if (isTabletOrAbove) {
                return <NotFound {...props} />;
              } else {
                return <NotFoundMobile {...props} />;
              }
            }}
          />
        </LocalizedSwitch>
        <ReactQueryDevtools initialIsOpen={false} />
      </LocalizedRouter>
    </Suspense>
  );
}

export default App;
