import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import LoginView from "./login-view";
import ClientsView from "./clients-view";
import DiscountsView from "./discounts-view";
import ReservesView from "./reserves-view";
import PointsView from "./points-view";


export default function App() {
    return (
        <Router>
                <Switch>
                    <Route exact path="/" component={LoginView} />
                    <Route  path={"/clients"} component={ClientsView} />
                    <Route  path={"/discounts"} component={DiscountsView} />
                    <Route  path={"/reserves"} component={ReservesView} />
                    <Route  path={"/points"} component={PointsView} />

                </Switch>
        </Router>
    );
}
