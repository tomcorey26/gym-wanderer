import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Server } from "miragejs";

new Server({
  routes() {
    this.namespace = "api";
    this.get("/gyms", () => {
      //add latitude/ longitude to this
      return {
        gyms: [
          {
            type: "Body building",
            rating: 5,
            name: "Toms Dawg Pound",
            ownername: "Tom Corey",
            location: {
              city: "Providence",
              state: "RI"
            },
            cost: 3,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          },
          {
            type: "Yoga",
            rating: 3.5,
            name: "Yoga studio",
            ownername: "yogi cynthia",
            location: {
              city: "Providence",
              state: "RI"
            },
            cost: 3,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          },
          {
            type: "Crossfit",
            rating: 4,
            name: "crossfit fo days",
            ownername: "Tryhard williams",
            location: {
              city: "Middletown",
              state: "RI"
            },
            cost: 2,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          }
        ]
      };
    });
  }
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
