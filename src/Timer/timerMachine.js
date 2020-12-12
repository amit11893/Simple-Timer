export const timerMachineConfig = {
  initial: {
    name: "idle",
    start: 0,
    elapsed: 0,
  },
  states: {
    idle: {
      on: {
        TOGGLE: "running",
      },
    },
    running: {
      on: {
        TOGGLE: "paused",
      },
    },
    paused: {
      on: {
        TOGGLE: "running",
      },
    },
  },
};

export const timerMachine = (state, event) => {
  switch (event.type) {
    case "TOGGLE":
      return {
        ...state,
        name: timerMachineConfig.states[state.name]?.on?.[event.type],
      };
    case "START":
      const startDate = new Date();
      return { ...state, start: startDate.getTime() - state.elapsed };
    case "TICK":
      const currentDate = new Date();
      return {
        ...state,
        elapsed: currentDate.getTime() - state.start,
      };
    case "RESET":
      return {
        name: "idle",
        start: 0,
        elapsed: 0,
      };
    default:
      return state;
  }
};
