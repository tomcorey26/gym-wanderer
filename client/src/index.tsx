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
            id: 43284932,
            type: "Body building",
            rating: 5,
            name: "Dawg Pound",
            ownername: "Tom Corey",
            location: {
              city: "Providence",
              state: "RI",
              coordinates: { lat: 41.8185216, lng: -71.1465856 }
            },
            cost: 3,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          },
          {
            id: 840923859,
            type: "Yoga",
            rating: 3.5,
            name: "Yoga studio",
            ownername: "yogi cynthia",
            location: {
              city: "Providence",
              state: "RI",
              coordinates: { lat: 41.7185216, lng: -71.3465856 }
            },
            cost: 3,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          },
          {
            id: 98423094382,
            type: "Crossfit",
            rating: 4,
            name: "crossfit fo days",
            ownername: "Tryhard williams",
            location: {
              city: "Middletown",
              state: "RI",
              coordinates: { lat: 41.9185216, lng: -71.3465856 }
            },
            cost: 2,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          },
          {
            id: 90238940382,
            type: "Bodybuilding",
            rating: 3.5,
            name: "dad bod lifts",
            ownername: "yogi cynthia",
            location: {
              city: "Providence",
              state: "RI",
              coordinates: { lat: 41.8185216, lng: -71.9465856 }
            },
            cost: 3,
            equipment: ["Olympic Barbell", "Power Rack", "Bench", "Dumbells"]
          },
          {
            id: 23958023,
            type: "Yoga",
            rating: 3.5,
            name: "Yoga studio",
            ownername: "yogi cynthia",
            location: {
              city: "Providence",
              state: "RI",
              coordinates: { lat: 41.8185216, lng: -71.3465856 }
            },
            cost: 3,
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
