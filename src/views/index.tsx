import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginView from './LoginView';
import ClientsView from './ClientsView';
import DiscountsView from './AchievementsView';
import ReservesView from './ReservesView';
import PointsView from './PointsView';
import GeneralInformationView from './GeneralInformationView';
import NotificationsView from './NotificationsView';
import MenuView from './MenuView';
import ProductsView from './ProductsView';
import { useAuth } from '../contexts/Auth';
import DashboardView from './DashboardView';
import ParcelsView from './ParcelsView';

export default function App() {
  const { userLoaded } = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route path={'/clients'} component={ClientsView} />
        <Route path={'/products'} component={ProductsView} />
        <Route path={'/menu'} component={MenuView} />
        <Route path={'/achievements'} component={DiscountsView} />
        <Route path={'/reserves'} component={ReservesView} />
        <Route path={'/points'} component={PointsView} />
        <Route
          path={'/generalInformations'}
          component={GeneralInformationView}
        />
        <Route path={'/notifications'} component={NotificationsView} />
        <Route path={'/dashboard'} component={DashboardView} />
        <Route path={'/parcels'} component={ParcelsView} />
      </Switch>
    </Router>
  );
}
