import { assign, createMachine } from "xstate";

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
      entry: assign({ count: (ctx) => ctx.count + 1 }),
      on: { TOGGLE: "inactive" },
    },
  },
  predictableActionArguments: true,
});
