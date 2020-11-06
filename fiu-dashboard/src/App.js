import React from 'react'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import './assets/main.css'

import Navbar from './components/NavBar'
import Login from './views/Login'
import MainLayout from './views/MainLayout'

function App() {
  return (
    <BrowserRouter basename={`${process.env.PUBLIC_URL}/`}>
      <Navbar />
      <Switch>
          <Route path="/login" render={props =><Login {...props} />} />
          <Route path="/dashboard" render={props => <MainLayout {...props} />} />
          
          <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
