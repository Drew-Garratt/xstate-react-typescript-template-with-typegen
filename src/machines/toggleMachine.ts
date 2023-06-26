import { assign, createMachine } from "xstate";
import { invokedMachine } from "./invokedMachine";

export const toggleMachine = createMachine({
  id: "toggle",
  initial: "inactive",
  tsTypes: {} as import("./toggleMachine.typegen").Typegen0,
  context: {
    count: 0,
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" },
    },
    active: {
      invoke: {
        id: "invoke",
        src: invokedMachine,
      },
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
});
