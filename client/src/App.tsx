import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

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
      <CssBaseline />
      <Routes />
    </div>
  );
};
export default App;
