import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Maps from "./pages/Maps";
import GymDetail from "./pages/GymDetail";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Maps} />
        <Route path="/gyms/:id" component={GymDetail} />
      </Switch>
    </Router>
  );
};

export default Routes;
