import React from "react";
import { useQuery } from "@apollo/react-hooks";

import Griddler from "./Griddler";
import { Levels } from "./gql";

import "./App.css";

const App = () => {
  const { loading, error, data } = useQuery(Levels);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error || !data || data.levels === 0) {
    return <div>{error ? error.message : "Something went wrong"}</div>;
  }

  return <Griddler levels={data.levels} />;
};

export default App;
