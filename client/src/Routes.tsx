import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';

import Griddler from './Components/Griddler';

const Routes: FC<{}> = () => (
  <Switch>
    <Route path="/:id">
      <Griddler />
    </Route>
    <Route path="/">
      <Griddler />
    </Route>
  </Switch>
);

export default Routes;
