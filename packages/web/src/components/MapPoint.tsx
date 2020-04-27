import React, { useContext } from 'react';
import { SearchContext } from '../context/SearchState';

interface Props {
  lat: number;
  lng: number;
  text: string;
  id: string;
}

const MapPoint: React.FC<Props> = ({ text, id }) => {
  const { dispatch, hoveredGymId } = useContext(SearchContext);
  let shared = {
    cursor: 'pointer',
    fontSize: 9,
    width: '100px',
    height: '20px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '25px',
  };
  let noHover = {
    ...shared,
    background: 'red',
  };

  let yesHover = {
    ...shared,
    transition: '200ms',
    height: '40px',
    background: 'blue',
    color: 'white',
  };

  return (
    <div
      onMouseOver={() =>
        dispatch({ type: 'UPDATE_HOVERED_GYM_ID', hoveredGymId: id })
      }
      onMouseLeave={() =>
        dispatch({ type: 'UPDATE_HOVERED_GYM_ID', hoveredGymId: 0 })
      }
      style={hoveredGymId === id ? yesHover : noHover}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default React.memo(MapPoint);
