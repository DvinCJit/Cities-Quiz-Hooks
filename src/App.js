import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GameScreen, StartGame } from "./pages";
import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={StartGame} />
        <Route path="/cities-quiz" exact component={GameScreen} />
      </Switch>
    </Router>
  );
}

export default App;
