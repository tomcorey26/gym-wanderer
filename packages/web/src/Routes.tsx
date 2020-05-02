import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import GymDetail from './pages/GymDetail';
import Home from './pages/Home';
import { CreateGym } from './pages/CreateGym/CreateGym';
import { SearchProvider } from './context/SearchState';
import { Register } from './pages/Register/Register';
import { Login } from './pages/Login';
import { Navbar } from './components/NavComponents/Navbar';
import { CssBaseline } from '@material-ui/core';
import { useUsersQuery } from '@gw/controllers';
import { UserProfilePage } from './pages/UserProfilePage';

const Routes: React.FC = () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });

  if (!data) {
    return <div>loading...</div>;
  }

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
        <Route path="/user/:id" component={UserProfilePage} />
        <Route path="/newgym" component={CreateGym} />
      </Switch>
    </Router>
  );
};

export default Routes;
