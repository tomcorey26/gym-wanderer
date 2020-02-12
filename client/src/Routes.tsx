import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import GymDetail from "./pages/GymDetail";
import Home from "./pages/Home";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/gyms/:id" component={GymDetail} />
      </Switch>
    </Router>
  );
};

export default Routes;
