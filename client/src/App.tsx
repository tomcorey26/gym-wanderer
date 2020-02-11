import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import axios from "axios";
import "./App.css";

const axiosIntance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

const App: React.FC = () => {
  useEffect(() => {
    asyncFunction();
  }, []);

  const asyncFunction = async () => {
    // await axiosIntance
    //   .get("/posts")
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <Routes />
    </div>
  );
};
export default App;
