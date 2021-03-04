import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import AppLayout from './components/applayout';
import Requests from './components/requests';
import About from './pages/about';

function App() {

  return (
    <BrowserRouter>
    <AppLayout>
    <Switch>
    <Route path="/requests" component={Requests} />
    <Route path="/about" component={About} />
    <Redirect from="/" to="/requests" />
    </Switch>
    </AppLayout>
    </BrowserRouter>
  );
}

export default App;
