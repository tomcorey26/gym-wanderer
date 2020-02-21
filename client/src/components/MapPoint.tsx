import React, { useState } from "react";

interface Props {
  lat: number;
  lng: number;
  isHovered: boolean;
  text: string;
  onMouseOver: any;
  onMouseLeave: any;
}

const MapPoint: React.FC<Props> = ({
  text,
  onMouseOver,
  onMouseLeave,
  isHovered
}) => {
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
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      style={isHovered ? yesHover : noHover}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default React.memo(MapPoint);
