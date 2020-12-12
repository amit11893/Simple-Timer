import * as React from "react";
import { useReducer } from "react";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { timerMachine, timerMachineConfig } from "./timerMachine";

export const Timer = () => {
  const [state, dispatch] = useReducer(
    timerMachine,
    timerMachineConfig.initial
  );

  React.useEffect(() => {
    if (state.name === "running") {
      dispatch({ type: "START" });
      const intervalId = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1);

      return () => clearInterval(intervalId);
    }
  }, [state.name]);

  return (
    <div className="timer" data-state={state}>
      <div className="display">
        <div className="elapsed" onClick={() => dispatch({ type: "TOGGLE" })}>
          <div>
            {String(Math.floor(state.elapsed / 60000)).padStart(2, "0")}
          </div>
          <div className="dot">:</div>
          <div>
            {String(Math.floor((state.elapsed % 60000) / 1000)).padStart(
              2,
              "0"
            )}
          </div>
          <div className="dot">:</div>
          <div>{String(Math.floor(state.elapsed % 1000)).padStart(3, "0")}</div>
        </div>
      </div>
      <div className="actions">
        {state.name === "running" && (
          <button
            onClick={() => dispatch({ type: "TOGGLE" })}
            title="Pause timer"
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}
        {(state.name === "paused" || state.name === "idle") && (
          <button
            onClick={() => dispatch({ type: "TOGGLE" })}
            title="Start timer"
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
        {state.name === "paused" && (
          <button
            onClick={() => dispatch({ type: "RESET" })}
            title="Stop timer"
          >
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
      </div>
    </div>
  );
};
