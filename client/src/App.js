import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Diff from './views/Diff';
import DiffDetail from './views/DiffDetail';
import NotFound from './views/NotFound';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Diff} />
        <Route path="/details/:id" component={DiffDetail} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
