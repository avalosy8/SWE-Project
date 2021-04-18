import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/home';
import Events from '../pages/events';
import Points from '../pages/points';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/events" component={Events} />
    <Route path="/points" component={Points} />
  </Switch>
);

export default Routes;