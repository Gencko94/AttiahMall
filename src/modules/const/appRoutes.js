export const AppRoute = {
  Home: 'routes.home',
  Cart: 'routes.cart',
  SingleProduct: 'routes.singleProduct',
  Login: 'routes.login',
  Register: 'routes.register',
};

export const AppRouteTitles = new Map([
  [AppRoute.Home, 'home.title'],
  [AppRoute.Cart, 'cart.title'],
]);
// Object.freeze(AppRoute);
// export const AppRouteTitles = new Map([[AppRoute.Home, 'home.title']]);
