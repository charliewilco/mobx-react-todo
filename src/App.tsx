import * as React from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import { ListView } from "./components/list-view";
import { Footer } from "./components/footer";
import "mobx-react-lite/batchingForReactDom";

const ObserverListView = observer(ListView);

function App() {
  return (
    <div className="Container">
      <h1>Tasks</h1>
      <ObserverListView />
      <Footer />
    </div>
  );
}

export default observer(App);
