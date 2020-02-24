import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import GymDetail from "./pages/GymDetail";
import Home from "./pages/Home";
import { SearchProvider } from "./context/SearchState";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <SearchProvider>
          <Route path="/search" component={Search} />
        </SearchProvider>
        <Route path="/gyms/:id" component={GymDetail} />
      </Switch>
    </Router>
  );
};

export default Routes;
