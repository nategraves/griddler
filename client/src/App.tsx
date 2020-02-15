import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:id">
          <Griddler levels={data.levels} />
        </Route>
        <Route path="/">
          <Griddler levels={data.levels} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
