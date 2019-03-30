import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';
import Login from '../screens/Login';

const Routes = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        {/* LANDING PAGE */}
        <Route path='/' exact component={() => <h1>Bem Vindo!</h1>} />
        {/* REGISTER */}
        <Route path='/register' exact component={() => <h1>Cadastre-se</h1>} />
        {/* LOGIN */}
        <Route path='/login' exact component={Login} />
        {/* HOME */}
        <Route path='/home' exact component={() => <h1>Olá, veja os usuarios e seus posts</h1>} />
        {/* POSTS */}
        <Route path='/posts' exact component={() => <h1>Estes são os meus posts</h1>} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;
