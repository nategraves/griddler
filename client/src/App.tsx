import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Griddler from "./Components/Griddler";
import { LevelsConsumer } from "./Contexts/Levels";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <LevelsConsumer>
        {props => {
          if (!props) {
            return null;
          }

          const { levels } = props;

          return (
            <Switch>
              <Route path="/:id">
                <Griddler levels={levels} />
              </Route>
              <Route path="/">
                <Griddler levels={levels} />
              </Route>
            </Switch>
          );
        }}
      </LevelsConsumer>
    </BrowserRouter>
  );
};

export default App;
