import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { UserProvider } from './context/userContext';
import { AppProvider } from './context/appContext';
import { CategoryProvider } from './context/categoryContext';
import { BrandProvider } from './context/brandContext';
import { OrderProvider } from './context/orderContext';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CategoryProvider>
        <BrandProvider>
          <AppProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </AppProvider>
        </BrandProvider>
      </CategoryProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
