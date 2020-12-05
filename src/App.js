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
import NotFound from './pages/NotFound';
import NotFoundMobile from './pages/NotFoundMobile';
import Wishlist from './pages/Wishlist';
import RegisterMobile from './pages/RegisterMobile';
import LoginMobile from './pages/LoginMobile';
import PasswordReset from './pages/PasswordReset';
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

          <ProtectedRoute path="/user/account">
            {isTabletOrAbove ? <MyAccount /> : <MyAccountMobile />}
          </ProtectedRoute>
          <ProtectedRoute path="/wishlist">
            {isTabletOrAbove ? <Wishlist /> : <MyAccountMobile />}
          </ProtectedRoute>

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
            path="/:category/:name/:id"
            render={props => {
              if (isTabletOrAbove) {
                return <SingleProduct {...props} />;
              } else {
                return <SingleProductMobile {...props} />;
              }
            }}
          />

          <Route
            path="/search/q=:query"
            render={props => {
              if (isTabletOrAbove) {
                return <Category {...props} />;
              } else {
                return <CategoryMobile {...props} />;
              }
            }}
          />

          <Route
            path="/checkout/quickcheckout"
            render={props => {
              if (isTabletOrAbove) {
                return <GuestCheckOut {...props} />;
              } else {
                return <GuestCheckOutMobile {...props} />;
              }
            }}
          />
          <Route path="/test" component={Test} />

          <Route
            render={props => {
              if (isTabletOrAbove) {
                return <NotFound {...props} />;
              } else {
                return <NotFoundMobile {...props} />;
              }
            }}
          ></Route>
        </LocalizedSwitch>
      </LocalizedRouter>
    </Suspense>
  );
}

export default App;
