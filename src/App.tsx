import * as React from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { ListView } from "./components/list-view";
import "mobx-react-lite/batchingForReactDom";

const ObserverListView = observer(ListView);

function App() {
  return (
    <div className="Container">
      <h1>Tasks</h1>
      <ObserverListView />
    </div>
  );
}

export default observer(App);
