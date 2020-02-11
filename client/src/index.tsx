import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Server } from "miragejs";
import { mockGymsApi } from "./mock";

new Server({
  routes() {
    this.namespace = "api";
    this.get("/gyms", () => {
      //add latitude/ longitude to this
      return {
        gyms: mockGymsApi
      };
    });
  }
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
