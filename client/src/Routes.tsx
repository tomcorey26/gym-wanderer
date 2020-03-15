import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import GymDetail from './pages/GymDetail';
import Home from './pages/Home';
import CreateGym from './pages/CreateGym';
import { SearchProvider } from './context/SearchState';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import Navbar from './components/Navbar';
import { CssBaseline } from '@material-ui/core';

const Routes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <CssBaseline />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
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
