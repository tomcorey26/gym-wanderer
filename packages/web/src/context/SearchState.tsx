import React, { createContext, useReducer } from 'react';
import { mockGymsApi } from '../mock';
import { Gyms } from '@gw/controllers';

type Actions =
  | { type: 'UPDATE_RADIUS_DISTANCE'; radius: number }
  | { type: 'UPDATE_ZOOM'; zoom: number }
  | { type: 'UPDATE_GYM_RESULTS'; gyms: any }
  | { type: 'UPDATE_HOVERED_GYM_ID'; hoveredGymId: number }
  | { type: 'UPDATE_SEARCH_QUERY'; searchQuery: string };

type State = {
  radiusDist: number | string | null;
  zoom: number;
  gyms: Gyms[];
  hoveredGymId: number;
  searchQuery: string;
};

const initialState = {
  radiusDist: '',
  zoom: 10,
  gyms: [],
  hoveredGymId: 0,
  searchQuery: '',
};

const SearchReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'UPDATE_RADIUS_DISTANCE':
      return { ...state, radiusDist: action.radius };
    case 'UPDATE_ZOOM':
      return { ...state, zoom: action.zoom };
    case 'UPDATE_GYM_RESULTS':
      return { ...state, gyms: action.gyms };
    case 'UPDATE_HOVERED_GYM_ID':
      return { ...state, hoveredGymId: action.hoveredGymId };
    case 'UPDATE_SEARCH_QUERY':
      return { ...state, searchQuery: action.searchQuery };
    default:
      return state;
  }
};

// create context
export const SearchContext = createContext<any>(initialState);

//Provider component
export const SearchProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  return (
    <SearchContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
