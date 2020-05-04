import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { render } from "react-dom";
import "mobx-react-lite/batchingForReactDom";
import "./styles.css";

const rootElement = document.getElementById("root");

const TodoApp = React.lazy(() => import("./pages/todo"));
const ObserverForm = React.lazy(() => import("./pages/form"));

const root = (
  <Router>
    <Switch>
      <React.Suspense fallback={<h1>Loading</h1>}>
        <div className="Container">
          <Route path="/form" component={ObserverForm} />
          <Route exact path="/" component={TodoApp} />
        </div>
      </React.Suspense>
    </Switch>
  </Router>
);

render(root, rootElement);
