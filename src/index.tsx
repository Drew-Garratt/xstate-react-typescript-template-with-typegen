import "./styles.css";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { inspect } from "@xstate/inspect";

inspect({
  iframe: false
});

const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" }
    }
  }
});

function App() {
  const [state, send] = useMachine(toggleMachine, { devTools: true });
  const active = state.matches("active");
  const { count } = state.context;

  return (
    <div className="App">
      <h1>XState React Viz Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
    </div>
  );
}
const rootElement = document.getElementById("root");

// create a root
const root = createRoot(rootElement);

//render app to root
root.render(<App />);
