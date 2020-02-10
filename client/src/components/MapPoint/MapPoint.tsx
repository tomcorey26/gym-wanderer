import React from "react";

interface Props {
  lat: number;
  lng: number;
  text: string;
}

const MapPoint: React.FC<Props> = ({ text }) => {
  return (
    <div
      style={{
        width: "60px",
        height: "20px",
        padding: "5px",
        background: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "25px"
      }}
    >
      <h2>{text}</h2>
    </div>
  );
};

export default MapPoint;
