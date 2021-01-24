import * as React from "react";
import { observer } from "mobx-react-lite";
import { ListView } from "../components/list-view";
import { Footer } from "../components/footer";

const ObserverListView = observer(ListView);

export default function App() {
  return (
    <div>
      <h1>Tasks</h1>
      <ObserverListView />
      <Footer />
    </div>
  );
}
