import { Coords } from "../types/Coords";
type State = {
  counter: number;
  isUserInput: any;
  center: Coords;
  zoom: number;
  autoComplete: any;
};

export const defaultState = {
  counter: 0,
  isUserInput: false,
  center: {
    lat: 0,
    lng: 0
  },
  zoom: 11,
  autoComplete: null
};

export function reducer(state: State = defaultState, action) {
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
