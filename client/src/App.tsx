import React, { useEffect } from 'react';
import Routes from './Routes';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './components/Navbar';
import { useHelloQuery } from './generated/graphql';
// import axios from "axios";

// const axiosIntance = axios.create({
//   baseURL: "https://jsonplaceholder.typicode.com"
// });

const App: React.FC = () => {
  const { data, loading } = useHelloQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  return (
    <div className="App">
      <h1>{data.hello}</h1>
      {/* <Navbar />
      <CssBaseline />
      <Routes /> */}
    </div>
  );
};
export default App;
