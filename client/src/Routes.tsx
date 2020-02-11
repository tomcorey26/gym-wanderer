import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Maps from "./pages/Maps";

const Routes: React.FC = () => {
  return (
    <Router>
      <Route path="/" component={Maps} />
    </Router>
  );
};

export default Routes;
