import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./pages/Search";
import GymDetail from "./pages/GymDetail";
import Home from "./pages/Home";
import CreateGym from "./pages/CreateGym";
import { SearchProvider } from "./context/SearchState";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search">
          <SearchProvider>
            <Search />
          </SearchProvider>
        </Route>
        <Route path="/gyms/:id" component={GymDetail} />
        <Route path="/newgym" component={CreateGym} />
      </Switch>
    </Router>
  );
};

export default Routes;
