import React, { useState, useEffect } from "react";
import Maps from "./components/Maps/Maps";
import axios from "axios";

const axiosIntance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});
const App: React.FC = () => {
  const [test, setTest] = useState<any>("");

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
      <Maps />
    </div>
  );
};

export default App;
