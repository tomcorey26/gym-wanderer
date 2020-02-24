import React, { useState, useContext } from "react";
import { SearchContext } from "../context/SearchState";

interface Props {
  lat: number;
  lng: number;
  text: string;
  id: number;
}

const MapPoint: React.FC<Props> = ({ text, id }) => {
  const { dispatch, hoveredGymId } = useContext(SearchContext);

  let noHover = {
    cursor: "pointer",
    width: "60px",
    height: "20px",
    padding: "5px",
    background: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px"
  };

  let yesHover = {
    cursor: "pointer",
    width: "60px",
    height: "20px",
    padding: "5px",
    background: "blue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px"
  };

  return (
    <div
      onMouseOver={() =>
        dispatch({ type: "UPDATE_HOVERED_GYM_ID", hoveredGymId: id })
      }
      onMouseLeave={() =>
        dispatch({ type: "UPDATE_HOVERED_GYM_ID", hoveredGymId: 0 })
      }
      style={hoveredGymId === id ? yesHover : noHover}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default React.memo(MapPoint);
