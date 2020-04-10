// store-provider.js

import React, { createContext, useReducer, useContext } from "react";

const defaultState = {
  counter: 0
};

// type Action =

function reducer(state = defaultState, action) {
  switch (action.type) {
    case "COUNTER_INC":
      return { ...state, counter: state.counter + 1 };
    case "COUNTER_DEC":
      return { ...state, counter: state.counter - 1 };
    case "COUNTER_RESET":
      return { ...state, counter: 0 };
    default:
      return state;
  }
}

const StoreContext = createContext<any>(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const value = { state, dispatch };

  return (
    <StoreContext.Provider value={value}> {children} </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
