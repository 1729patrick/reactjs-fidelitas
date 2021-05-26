import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginView from './LoginView';
import ClientsView from './ClientsView';
import DiscountsView from './DiscountsView';
import ReservesView from './ReservesView';
import PointsView from './PointsView';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path={'/clients'} component={ClientsView} />
        <Route path={'/discounts'} component={DiscountsView} />
        <Route path={'/reserves'} component={ReservesView} />
        <Route path={'/points'} component={PointsView} />
      </Switch>
    </Router>
  );
}
