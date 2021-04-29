import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import CreateProduct from './pages/CreateProduct';
import Brands from './pages/Brands';
import Categories from './pages/Categories';
import Error from './pages/Error';

import Navbar from './components/Navbar/Navbar';
import Notification from './components/Notification/Notification';

import { useUserContext } from './context/userContext';

function App() {
  const { isAdmin, isAuth } = useUserContext();

  return (
    <Router>
      <Navbar />
      <Notification />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/product/:id' component={Product} />
        {isAuth && <Route path='/cart' component={Cart} />}
        {isAuth && <Route path='/order' component={Orders} />}
        {isAdmin && <Route path='/brands' component={Brands} />}
        {isAdmin && (
          <Route path='/edit-product/:id' component={CreateProduct} />
        )}
        {isAdmin && <Route path='/create-product' component={CreateProduct} />}
        {isAdmin && <Route path='/categories' component={Categories} />}
        <Route path='*' component={Error} />
      </Switch>
    </Router>
  );
}

export default App;
