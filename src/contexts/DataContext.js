import React from 'react';

import audio2 from '../assets/products/audio2.jpg';
import audiosm from '../assets/products/audiosm.jpg';
import audio from '../assets/products/audio.jpg';
import fryer from '../assets/products/fryer.jpg';
import fryersm from '../assets/products/fryersm.jpg';
import fryer2 from '../assets/products/fryer2.jpg';
import fryer3 from '../assets/products/fryer3.jpg';
import fryer4 from '../assets/products/fryer4.jpg';

import kenwood from '../assets/products/kenwood.jpg';
import kenwoodsm from '../assets/products/kenwoodsm.jpg';
import kenwood2 from '../assets/products/kenwood2.jpg';
import kenwood3 from '../assets/products/kenwood3.jpg';
import liss from '../assets/products/liss.jpg';
import lisssm from '../assets/products/lisssm.jpg';
import liss2 from '../assets/products/liss2.jpg';
import liss3 from '../assets/products/liss3.jpg';
import liss4 from '../assets/products/liss4.jpg';
import pump from '../assets/products/pump.jpg';
import pumpsm from '../assets/products/pumpsm.jpg';

import a20s from '../assets/phones/a20s.jpg';
import a51 from '../assets/phones/a51.jpg';
import iphone7 from '../assets/phones/iphone7.jpg';
import iphone11 from '../assets/phones/iphone11.jpg';
import iphoneblack from '../assets/phones/iphoneblack.jpg';
import m30 from '../assets/phones/m30.jpg';
import note10 from '../assets/phones/note10.jpg';
import taba from '../assets/phones/taba.jpg';

import filtermask from '../assets/healthcare/filtermask.jpg';
import bluemask from '../assets/healthcare/bluemask.jpg';
import greenmask from '../assets/healthcare/greenmask.jpg';
import pandamask from '../assets/healthcare/pandamask.jpg';
import sanitizer from '../assets/healthcare/sanitizer.jpg';
import shield from '../assets/healthcare/shield.jpg';
import blackmask from '../assets/healthcare/blackmask.jpg';
import omega3 from '../assets/healthcare/omega3.jpg';

import milk from '../assets/home/milk.jpg';
import scale from '../assets/home/scale.jpg';
import patsry from '../assets/home/patsry.jpg';
import holder from '../assets/home/holder.jpg';
import spoon from '../assets/home/spoon.jpg';
import opalina from '../assets/home/opalina.jpg';
import bowl from '../assets/home/bowl.jpg';

import olive from '../assets/fashion/olive.jpg';
import brave from '../assets/fashion/brave.jpg';
import denim from '../assets/fashion/denim.jpg';
import trendyol from '../assets/fashion/trendyol.jpg';
import yong from '../assets/fashion/yong.jpg';
import streets from '../assets/fashion/streets.jpg';
import adidas from '../assets/fashion/adidas.jpg';

import { useQuery } from 'react-query';
import { getAllCategories, getDeliveryCountries } from '../Queries/Queries';
export const DataProvider = React.createContext();
export default function DataContextProvider({ children }) {
  const localDeliveryCountry = localStorage.getItem('deliveryCountry');
  const [deliveryCountry, setDeliveryCountry] = React.useState(null);
  const [isLightTheme, setLightTheme] = React.useState(true);

  const localViewed = localStorage.getItem('visitedItems');
  const [viewedItems, setViewedItems] = React.useState(() => {
    if (localViewed) {
      return JSON.parse(localViewed);
    } else {
      return [];
    }
  });
  const prefferedLanguage = localStorage.getItem('prefferedLanguage');

  const [language, setLanguage] = React.useState(() => {
    if (prefferedLanguage) {
      return prefferedLanguage;
    } else {
      return 'en';
    }
  });

  const handleLanguageChange = lang => {
    localStorage.setItem('prefferedLanguage', lang);
    setLanguage(lang);
  };
  const getViewedItems = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        const visitedItems = allItems.filter(item =>
          viewedItems.includes(item.id)
        );
        resolve({ visitedItems });
      }, 1500);
    });
  };
  const addViewedItems = id => {
    return new Promise(resolve => {
      const visitedItems = JSON.parse(localStorage.getItem('visitedItems'));
      const isItemInHistory = visitedItems.find(item => item.id === id);
      if (!isItemInHistory) {
        visitedItems.push(id);
        localStorage.setItem('visitedItems', JSON.stringify(visitedItems));
        setViewedItems(visitedItems);
      }
      setTimeout(() => {
        resolve({ msg: 'ok' });
      }, 500);
    });
  };
  const removeViewedItem = id => {
    return new Promise(resolve => {
      setTimeout(() => {
        const updated = viewedItems.filter(i => i !== id);
        setViewedItems(updated);
        localStorage.setItem('visitedItems', JSON.stringify(updated));
        resolve({
          message: 'ok',
          id,
        });
      }, 1000);
    });
  };

  const getRecentlyViewedVertical = visitedItems => {
    return new Promise(resolve => {
      let iDs = visitedItems.map(item => item.id);
      let visited = allItems.filter(item => iDs.includes(item.id));
      setTimeout(() => {
        resolve(visited.slice(0, 5));
      }, 1000);
    });
  };
  const getFeaturedItems = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(phone);
      }, 1250);
    });
  };

  const getOrderedItems = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(orderedItems);
      }, 1000);
    });
  };

  const countries = ['usa', 'uk', 'jp', 'korea', 'kuwait', 'qatar', 'uae'];

  const allItems = [
    {
      id: '1',
      brand: 'Babyliss',
      name: 'Babyliss Hair Dryer 6730 SDE 1800W',
      sale: true,
      priceBefore: '500.00',
      price: '399.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: lisssm, main: [liss, liss2, liss3, liss4] },
      category: 'Beauty & Health',
      subCategory: 'Styling Tools',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 3,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },

    {
      id: '2',
      brand: 'Black&Decker',
      name: 'Black&Decker Air Fryer AF220-B5',
      sale: true,
      priceBefore: '400.00',
      price: '218.50',
      soldBy: 'Sell Star Electronics',
      condition: 'New',
      description:
        "Black+Decker AF220-B5 Air Fryer is an excellent addition to your kitchen. It boasts of the Rapid Air Convection Technology. This allows you to fry your favorite food such as fries, nuggets, and more. In addition to this, the handle does not heat up so that you can safely take the food out of the basket',reasonsToBuy:'he Black+Decker AF220-B5 Air Fryer is an excellent addition to your kitchen. It boasts of the Rapid Air Convection Technology. This allows you to fry your favorite food such as fries, nuggets, and more. In addition to this, the handle does not heat up so that you can safely take the food out of the basket. What's more, you can wash this appliance's parts quickly in a dishwasher. You can manually operate this Black and Decker air fryer without a hassle. Thanks to its 800g basket capacity, you can air fry food for a large number of people. This air fryer has a black finish that looks brilliant in your kitchen. Key Features Power: 1500W Voltage: 220-240V Frequency: 50-60Hz 2.5L gross capacity Safety lock Over-heat protection Rapid Air Convection Technology 60 min timer Guilt-free Fried Food The Rapid Air Convection Technology helps to fry food using minimal fat. This technology generates immense heat at which you can fry the food in a healthy way. Thus, you can indulge in your favorite fried foodstuffs without any guilt. Safe for Use You can use the temperature control knob to regulate the temperature at which your food is being cooked inside this Black and Decker appliance. Furthermore, the Cool-touch housing and handle prevent your skin from burns upon contact. This makes the air fryer safe for use. The safety lock of this air fryer ensures that the food remains locked in. User-friendly Appliance You can place the Black and Decker air fryer on almost any kitchen surface as it has non-slip feet. Thus, the air fryer will not fall. Also, you can operate this appliance conveniently. The over-heat protection feature ensures that the safety of the appliance and you",
      technicalDetails: {
        'Power supply input frequency': '220-240 50/60Hz',
        'Non-stick inner bowl':
          'Non-stick coated stainless - steel basket- easy to clean',
        'Suitable for': 'Fry - Roast - Grill - Bake',
      },
      photos: { small: fryersm, main: [fryer, fryer2, fryer3, fryer4] },
      category: 'Home & Kitchen',
      subCategory: 'Air Fryers',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 4.5,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },
    {
      id: '3',
      brand: 'Kenwood',
      name: ' Kenwood Kitchen Machine KVL4230S',
      sale: true,
      priceBefore: '2100.00',
      price: '1899.00',
      soldBy: 'Carrefour',
      condition: 'New',
      description:
        'Chef KVL4230SEnjoy the process of cooking even more with the Kenwood Chef XL.',
      reasonsToBuy:
        "About the Chef XL KVL4230SBring great tasting food to the table with this reliable kitchen machine. Designed to make light work of food preparation, this product will help you to create an array of dishes with ease. Dedicated bowl tools whether you're using the K-Beater to make tasty biscuits, the whisk to whip up the thickest cream or the dough hook to knead dough for homemade pizza, the accompanying bowl tools enable you to make delicious food with confidence.A world of possibilitiesThere are over 20 attachments available, so whether you want to create homemade salsa, blend healthy smoothies and soups, mince your own meat, or cut pasta shapes, the Kenwood Chef XL will assist you in producing a variety of culinary delights.",
      technicalDetails: {
        'Bowl Material': 'Metal',
        'Bowl capacity': '4.5',
        Power: '1200',
      },
      photos: { small: kenwoodsm, main: [kenwood, kenwood2, kenwood3] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 1.5,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },
    {
      id: '4',
      brand: 'Namson',
      name:
        'Namson Rechargeable Touch Water Dispenser , Size-6.5 X 17.5Cm , Silicone Hose Included',
      sale: true,
      priceBefore: '200.00',
      price: '99.00',
      soldBy: 'DubaiGallery',
      condition: 'New',
      description: 'Water Dispenser',
      reasonsToBuy:
        'Perfectly designed for optimal useMade of top-class materials for enhanced durabilityEasy to use and maintain',
      photos: { small: pumpsm, main: [pump] },
      category: 'Home & Kitchen',
      subCategory: 'Water Dispensers & Coolers',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 4,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },
    {
      id: '5',
      brand: 'Babyliss',
      name: 'Babyliss Hair Dryer 6730 SDE 1800W',
      sale: true,
      priceBefore: '500.00',
      price: '399.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: lisssm, main: [liss, liss2, liss3, liss4] },
      category: 'Beauty & Health',
      subCategory: 'Styling Tools',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 1,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },

    {
      id: '6',
      brand: 'Yamaha',
      name: 'Yamaha RX-V385 + NS-PA40 4K Hometheatre Package',
      sale: true,
      priceBefore: '2500.00',
      price: '1999.00',
      soldBy: 'Carrefour',
      condition: 'New',
      description: [
        'Yamaha Bluetooth compatible 5.1-channel AV receiver with fully discrete combination of graceful curvilinear design, this 5.1-channel speaker system will look stylish in any home, while providing full enjoyment of both music and movies. 5.1-channel speaker system compatible with HD audio sources',
        '2-way, 3-speaker front speakers deliver rich lows, clear dialogue and expressive vocals',
        'Advanced YSTII subwoofer',
        'The slim, striking design of the front speakers will add a smart touch to any interior',
        'Glossy black cabinets match the latest TVs',
        'Designed to enable clean and neat wiring (cable hidden inside front speaker)',
        'Surround and centre speakers can be wall mounted',
      ],
      reasonsToBuy: null,
      photos: { small: audiosm, main: [audio, audio2] },
      category: 'Electronics & Mobiles',
      subCategory: 'Portable Bluetooth Speaker',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 3.5,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },
    {
      id: '7',
      brand: 'iPhone',
      name: 'iPhone 11 With FaceTime Black 128GB 4G LTE - International Specs',
      sale: true,
      priceBefore: '3159.00',
      price: '2769.00',
      photos: { small: iphone11, main: [iphone11] },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 4.5,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },
    {
      id: '8',
      brand: 'Samsung',
      name: 'Galaxy Note10 Plus Dual SIM Aura White 256GB 12GB RAM 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: note10, main: [note10] },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
      sizes: ['XS', 'SM', 'MD', 'LG', 'XL'],
      availableSizes: ['XS', 'MD', 'XL'],
      colors: [
        '#00ff44',
        '#fbff00',
        '#00aeff',
        '#00ff0d',
        '#00ffea',
        '#ff2200',
      ],
      availableColors: ['#fbff00', '#00ffea'],
      rating: 5,
      reviews: [
        {
          id: '5879655',
          author: 'Some Name 1',
          date: '5/10/2020',
          body: 'This product is very good',
          rating: 4.5,
        },
        {
          id: '5879656',
          author: 'Some Name 2',
          date: '29/3/2003',
          body: 'This product is Awesome !',
          rating: 5,
        },
        {
          id: '5879657',
          author: 'Some Name 3',
          date: '15/6/2000',
          body: 'This product is Awesome !',
          rating: 0.5,
        },
        {
          id: '5879658',
          author: 'Some Name 4',
          date: '1/3/1995',
          body: 'Is suffers from nad quality ',
          rating: 3,
        },
      ],
    },
    {
      id: '9',
      brand: 'iPhone',
      name: 'Apple iPhone 11 Pro With FaceTime Midnight Green 128GB',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: iphoneblack, main: [iphoneblack] },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: '10',
      brand: 'Samsung',
      name: 'Galaxy A20s Dual SIM Black 3GB RAM 32GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: a20s, main: [a20s] },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: '11',
      brand: 'Samsung',
      name: 'Galaxy A51 Dual SIM Prism Crush Black 6GB RAM 128GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: a51, main: [a51] },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: '12',
      brand: 'Samsung',
      name: 'Galaxy Tab A (2019) 8.0 Inch, 32GB, 2GB RAM, Wi-Fi, 4G LTE, Black',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: taba, main: taba },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: '13',
      brand: 'iPhone',
      name: 'Refurbished - iPhone 7 With FaceTime Gold 128GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: iphone7 },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: '14',
      brand: 'Samsung',
      name: 'Galaxy M30 Single Sim Black 4GB 64GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: m30 },
      category: 'Electronics & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: '40',
      brand: 'JACK & JONES',
      name: 'JACK & JONES Lightweight Quilted Jacket in Olive',
      sale: true,
      priceBefore: '299.00',
      price: '123.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: olive, main: [olive] },
      category: 'Fashion',
      subCategory: 'Men Jackets',
    },
    {
      id: '41',
      brand: 'JACK & JONES',

      name: 'JACK & JONES Alvin AGI 004 Denim Jacket in Blue',
      sale: true,
      priceBefore: '299.00',
      price: '123.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: denim, main: [denim] },
      category: 'Fashion',
      subCategory: 'Men Jackets',
    },
    {
      id: '42',
      brand: 'BRAVE SOUL',

      name: 'BRAVE SOUL Elasticated Cuff Detail Long Sleeve Jacket',
      sale: true,
      priceBefore: '299.00',
      price: '123.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: brave, main: [brave] },
      category: 'Fashion',
      subCategory: 'Men Jackets',
    },
    {
      id: '43',
      brand: 'TRENDYOL',

      name: 'TRENDYOL Double Breasted Longline Coat in Black',
      sale: true,
      priceBefore: '599.00',
      price: '323.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: trendyol, main: [trendyol] },
      category: 'Fashion',
      subCategory: 'Women Jackets',
    },
    {
      id: '44',
      brand: 'Jacqueline de Yong',

      name: 'Jacqueline de Yong Exaggerated Lapel Coat in Grey',
      sale: true,
      priceBefore: '599.00',
      price: '323.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: yong, main: [yong] },
      category: 'Fashion',
      subCategory: 'Women Jackets',
    },
    {
      id: '45',
      brand: 'High Streets Stripe',
      name: 'High Streets Stripe Detailed Longline Jacket',
      sale: true,
      priceBefore: '599.00',
      price: '323.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: streets, main: [streets] },
      category: 'Fashion',
      subCategory: 'Women Jackets',
    },
    {
      id: '46',
      brand: 'adidas',
      name: 'ADIDAS Comfortable Long Sleeves E 3S TT TRIC Jacket',
      sale: true,
      priceBefore: '249.00',
      price: '173.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: adidas, main: [adidas] },
      category: 'Fashion',
      subCategory: 'Men Jackets',
    },
    {
      id: '20',

      name:
        'Reusable Washable Anti-Viral Face Mask With Virus Neutralization ISO18184 Medium Black',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '99.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: filtermask, main: [filtermask] },
      category: 'Beauty & Health',
      subCategory: 'Masks',
    },
    {
      id: '21',

      name: 'Omega 3-6-9',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '60.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: omega3, main: [omega3] },
      category: 'Beauty & Health',
      subCategory: 'Food Supplements',
    },
    {
      id: '22',

      name: 'Pack Of 50 Disposable 3-Ply Face Mask',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '21.50',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: greenmask, main: [greenmask] },
      category: 'Beauty & Health',
      subCategory: 'Masks',
    },
    {
      id: '23',

      name: 'Adjustable Anti-Smoke Face Shield Mask',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '3.50',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: shield, main: [shield] },
      category: 'Beauty & Health',
      subCategory: 'Masks',
    },
    {
      id: '24',

      name: 'Scented Antibacterial Hand Sanitizer 70% Alcohol Clear - 500ml',
      sale: true,
      brand: null,
      priceBefore: '57.00',
      price: '19.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: sanitizer, main: [sanitizer] },
      category: 'Beauty & Health',
      subCategory: 'Hand Sanitizers',
    },
    {
      id: '25',

      name: 'Respirator Safety Face Mask Black/White',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '2.85',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: pandamask, main: [pandamask] },
      category: 'Beauty & Health',
      subCategory: 'Masks',
    },
    {
      id: '26',

      name: 'Chennai Super Kings Reusable and Washable Face Mask',
      brand: 'Chennai',
      sale: true,
      priceBefore: '57.00',
      price: '24.95',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: bluemask, main: [bluemask] },
      category: 'Beauty & Health',
      subCategory: 'Masks',
    },
    {
      id: '26',

      name: 'Royal Challengers Bangalore Reusable and Washable Face Mask',
      brand: 'Royal Challengers',
      sale: true,
      priceBefore: '59.00',
      price: '24.95',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: blackmask, main: [blackmask] },
      category: 'Beauty & Health',
      subCategory: 'Masks',
    },
    {
      id: '30',

      name:
        'Stainless Steel Milk Foam Measuring Cup H15954S Silver 10.5 x 7.5 x 9centimeter',
      brand: null,
      sale: true,
      priceBefore: '69.00',
      price: '14.80',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: milk, main: [milk] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
    {
      id: '31',

      name: 'LCD Display Coffee Drip Scale H21401 Black',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '47.90',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: scale, main: [scale] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
    {
      id: '32',

      name: 'Pattiserie Glass Footed Cake Stand With Dome Clear 187millimeter',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '19.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: patsry, main: [patsry] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
    {
      id: '34',

      name: 'Coffee Capsule Holder And Stand Black/Silver 39centimeter',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '19.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: holder, main: [holder] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
    {
      id: '35',

      name: 'Single Spoon Rest With Dish Gold/Grey 10x18x10centimeter',
      brand: null,
      sale: true,
      priceBefore: '99.00',
      price: '32.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: spoon, main: [spoon] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
    {
      id: '36',

      name:
        'Rectangle Shape Stainless Steel Tray With Handle Gold 38x15centimeter',
      brand: null,
      sale: false,
      priceBefore: null,
      price: '32.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: opalina, main: [opalina] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
    {
      id: '37',

      name: 'Blooming Opulence Fine Bone China Bowl Multicolour 14centimeter',
      brand: null,
      sale: true,
      priceBefore: '27.00',
      price: '20.00',
      soldBy: 'Atiah Mall',
      condition: 'New',
      description: null,
      reasonsToBuy: null,
      technicalDetails: null,
      photos: { small: bowl, main: [bowl] },
      category: 'Home & Kitchen',
      subCategory: 'Kitchen & Home Appliances',
    },
  ];

  const phone = [
    {
      id: 7,
      brand: 'iPhone',
      name: 'iPhone 11 With FaceTime Black 128GB 4G LTE - International Specs',
      sale: true,
      priceBefore: '3159.00',
      price: '2769.00',
      photos: { small: iphone11, main: [iphone11] },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 8,
      brand: 'Samsung',
      name: 'Galaxy Note10 Plus Dual SIM Aura White 256GB 12GB RAM 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: note10, main: [note10] },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 9,
      brand: 'iPhone',
      name: 'Apple iPhone 11 Pro With FaceTime Midnight Green 128GB',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: iphoneblack, main: [iphoneblack] },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 10,
      brand: 'Samsung',
      name: 'Galaxy A20s Dual SIM Black 3GB RAM 32GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: a20s, main: [a20s] },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 11,
      brand: 'Samsung',
      name: 'Galaxy A51 Dual SIM Prism Crush Black 6GB RAM 128GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: a51, main: [a51] },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 12,
      brand: 'Samsung',
      name: 'Galaxy Tab A (2019) 8.0 Inch, 32GB, 2GB RAM, Wi-Fi, 4G LTE, Black',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: taba, main: [taba] },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 13,
      brand: 'iPhone',
      name: 'Refurbished - iPhone 7 With FaceTime Gold 128GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: iphone7 },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
    {
      id: 14,
      brand: 'Samsung',
      name: 'Galaxy M30 Single Sim Black 4GB 64GB 4G LTE',
      sale: true,
      priceBefore: '3750.00',
      price: '2899.00',
      photos: { small: m30 },
      category: 'Electronice & Mobiles',
      subCategory: 'Smartphones',
    },
  ];

  const orderedItems = [
    {
      orderNo: '#87954-486',
      status: 'Delivered',
      delivered: true,
      orderDate: '1/1/1970',
      deliveryDate: '2/1/1970',
      deliveryDestination: 'Riyadh',
      expectedDelivery: null,
      orderAmount: '3480 SAR',
      orderItems: [
        {
          id: 14,
          brand: 'Samsung',
          name: 'Galaxy M30 Single Sim Black 4GB 64GB 4G LTE',
          sale: true,
          priceBefore: '3750.00',
          price: '2899.00',
          photos: { small: m30 },
          category: 'Electronics & Mobiles',
          subCategory: 'Smartphones',
        },
        {
          id: '40',
          brand: 'JACK & JONES',
          name: 'JACK & JONES Lightweight Quilted Jacket in Olive',
          sale: true,
          priceBefore: '299.00',
          price: '123.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: olive, main: [olive] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
        {
          id: '41',
          brand: 'JACK & JONES',

          name: 'JACK & JONES Alvin AGI 004 Denim Jacket in Blue',
          sale: true,
          priceBefore: '299.00',
          price: '123.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: denim, main: [denim] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
        {
          id: '42',
          brand: 'BRAVE SOUL',

          name: 'BRAVE SOUL Elasticated Cuff Detail Long Sleeve Jacket',
          sale: true,
          priceBefore: '299.00',
          price: '123.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: brave, main: [brave] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
        {
          id: '43',
          brand: 'TRENDYOL',

          name: 'TRENDYOL Double Breasted Longline Coat in Black',
          sale: true,
          priceBefore: '599.00',
          price: '323.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: trendyol, main: [trendyol] },
          category: 'Fashion',
          subCategory: 'Women Jackets',
        },
        {
          id: '44',
          brand: 'Jacqueline de Yong',

          name: 'Jacqueline de Yong Exaggerated Lapel Coat in Grey',
          sale: true,
          priceBefore: '599.00',
          price: '323.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: yong, main: [yong] },
          category: 'Fashion',
          subCategory: 'Women Jackets',
        },
        {
          id: '45',
          brand: 'High Streets Stripe',
          name: 'High Streets Stripe Detailed Longline Jacket',
          sale: true,
          priceBefore: '599.00',
          price: '323.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: streets, main: [streets] },
          category: 'Fashion',
          subCategory: 'Women Jackets',
        },
        {
          id: '46',
          brand: 'adidas',
          name: 'ADIDAS Comfortable Long Sleeves E 3S TT TRIC Jacket',
          sale: true,
          priceBefore: '249.00',
          price: '173.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: adidas, main: [adidas] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
      ],
    },
    {
      orderNo: '#15326-5172',
      status: 'Pending',
      delivered: false,
      orderDate: '5/1/1970',
      deliveryDate: null,
      deliveryDestination: 'Riyadh',
      expectedDelivery: '5/7/1970',
      orderAmount: '1120 SAR',

      orderItems: [
        {
          id: 14,
          brand: 'Samsung',
          name: 'Galaxy M30 Single Sim Black 4GB 64GB 4G LTE',
          sale: true,
          priceBefore: '3750.00',
          price: '2899.00',
          photos: { small: m30 },
          category: 'Electronics & Mobiles',
          subCategory: 'Smartphones',
        },
        {
          id: '40',
          brand: 'JACK & JONES',
          name: 'JACK & JONES Lightweight Quilted Jacket in Olive',
          sale: true,
          priceBefore: '299.00',
          price: '123.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: olive, main: [olive] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
        {
          id: '41',
          brand: 'JACK & JONES',

          name: 'JACK & JONES Alvin AGI 004 Denim Jacket in Blue',
          sale: true,
          priceBefore: '299.00',
          price: '123.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: denim, main: [denim] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
        {
          id: '42',
          brand: 'BRAVE SOUL',

          name: 'BRAVE SOUL Elasticated Cuff Detail Long Sleeve Jacket',
          sale: true,
          priceBefore: '299.00',
          price: '123.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: brave, main: [brave] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
        {
          id: '43',
          brand: 'TRENDYOL',

          name: 'TRENDYOL Double Breasted Longline Coat in Black',
          sale: true,
          priceBefore: '599.00',
          price: '323.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: trendyol, main: [trendyol] },
          category: 'Fashion',
          subCategory: 'Women Jackets',
        },
        {
          id: '44',
          brand: 'Jacqueline de Yong',

          name: 'Jacqueline de Yong Exaggerated Lapel Coat in Grey',
          sale: true,
          priceBefore: '599.00',
          price: '323.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: yong, main: [yong] },
          category: 'Fashion',
          subCategory: 'Women Jackets',
        },
        {
          id: '45',
          brand: 'High Streets Stripe',
          name: 'High Streets Stripe Detailed Longline Jacket',
          sale: true,
          priceBefore: '599.00',
          price: '323.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: streets, main: [streets] },
          category: 'Fashion',
          subCategory: 'Women Jackets',
        },
        {
          id: '46',
          brand: 'adidas',
          name: 'ADIDAS Comfortable Long Sleeves E 3S TT TRIC Jacket',
          sale: true,
          priceBefore: '249.00',
          price: '173.80',
          soldBy: 'Atiah Mall',
          condition: 'New',
          description: null,
          reasonsToBuy: null,
          technicalDetails: null,
          photos: { small: adidas, main: [adidas] },
          category: 'Fashion',
          subCategory: 'Men Jackets',
        },
      ],
    },
  ];
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    'categories',
    getAllCategories,
    {
      retry: true,
      refetchOnWindowFocus: false,
    }
  );
  const {
    data: deliveryCountries,
    isLoading: deliveryCountriesLoading,
  } = useQuery('delivery-countries', getDeliveryCountries, {
    retry: true,
    refetchOnWindowFocus: false,
    onSuccess: data => {
      setDeliveryCountry(
        data.find(
          country =>
            country.translation.en.name ===
            JSON.parse(localDeliveryCountry).deliveryCountry.en
        )
      );
    },
  });
  return (
    <DataProvider.Provider
      value={{
        categories: categories,
        categoriesLoading: categoriesLoading,
        deliveryCountry: deliveryCountry,
        deliveryCountries,
        deliveryCountriesLoading,

        setDeliveryCountry,
        countries,
        phone,
        isLightTheme,
        setLightTheme,
        orderedItems,
        language,
        handleLanguageChange,

        getOrderedItems,
        getRecentlyViewedVertical,
        getFeaturedItems,
        getViewedItems,
        addViewedItems,
        removeViewedItem,
      }}
    >
      {children}
    </DataProvider.Provider>
  );
}
