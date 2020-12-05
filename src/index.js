import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/styles.css';
import './css/rtl.css';
import App from './App';
import DataContextProvider from './contexts/DataContext';

import SearchContext from './contexts/SearchContext';
import AuthContext from './contexts/AuthContext';
import CartAndWishlistContext from './contexts/CartAndWishlistContext';

const localCart = localStorage.getItem('localCart');
if (!localCart) {
  localStorage.setItem('localCart', JSON.stringify([]));
}
const localWish = localStorage.getItem('localWish');
if (!localWish) {
  localStorage.setItem('localWish', JSON.stringify([]));
}
const visitedItems = localStorage.getItem('visitedItems');
if (!visitedItems) {
  localStorage.setItem('visitedItems', JSON.stringify([]));
}
const prefferedLanguage = localStorage.getItem('prefferedLanguage');
if (!prefferedLanguage) {
  localStorage.setItem('prefferedLanguage', 'en');
}
const myLocalLocations = localStorage.getItem('myLocalLocations');
if (!myLocalLocations) {
  localStorage.setItem('myLocalLocations', JSON.stringify([]));
}
const deliveryCountry = localStorage.getItem('deliveryCountry');
if (!deliveryCountry) {
  localStorage.setItem(
    'deliveryCountry',
    JSON.stringify({ deliveryCountry: { en: 'Kuwait', ar: 'الكويت' } })
  );
}

// const localAuthenticated = localStorage.getItem('localAuthenticated');
// if (!localAuthenticated) {
//   localStorage.setItem('localAuthenticated', false);
// }
ReactDOM.render(
  <AuthContext>
    <DataContextProvider>
      <CartAndWishlistContext>
        <SearchContext>
          <App />
        </SearchContext>
      </CartAndWishlistContext>
    </DataContextProvider>
  </AuthContext>,

  document.getElementById('root')
);
