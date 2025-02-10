import { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Movie from "./components/Movie";
import "./App.css";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Movie} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
