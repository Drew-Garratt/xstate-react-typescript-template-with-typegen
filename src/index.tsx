import "./styles.css";
import { createRoot } from "react-dom/client";
import { useMachine } from "@xstate/react";
import { toggleMachine } from "./machines/toggleMachine";

const devTools = import.meta.env.DEV;

/**
 * Enable XState Dev inspect
 *
 * Please note Dev enviroment check is tied to Vite
 */
if (devTools) {
  const { inspect } = await import("@xstate/inspect");
  inspect({
    iframe: false,
  });
}

function App() {
  const [state, send] = useMachine(toggleMachine, { devTools });
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

if (rootElement) {
  // create a root
  const root = createRoot(rootElement);

  //render app to root
  root.render(<App />);
}
