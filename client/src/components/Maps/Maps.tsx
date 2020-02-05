import React, { useEffect, useState } from "react";
import "./Maps.scss";
import MapsSideScroller from "../MapsSideScroller/MapsSideScroller";
import { Coords } from "../../types/Coords";
import useCurrentGeolocation from "../../hooks/useCurrentLocation";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import { Key } from "../../key";
import { libraries } from "./libraries";

const Maps: React.FC = () => {
  const location = useCurrentGeolocation();
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });
  const [zoom, setZoom] = useState<number>(11);
  const [autoComplete, setAutoComplete] = useState<any>(null);

  const onLoad = (auto: any) => {
    setAutoComplete(auto);
  };

  const onPlaceChanged = () => {
    if (!isUserInput) {
      setIsUserInput(true);
    }
    if (autoComplete !== null) {
      let place = autoComplete.getPlace();
      let lat = place.geometry.location.lat();
      let long = place.geometry.location.lng();
      setCenter({ lat: lat, lng: long });
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    // <LoadScript libraries={libraries} id="script-loader" googleMapsApiKey={Key}>
    <div
      className="search-gym-page"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="gym-map"
        style={{
          height: "40%",
          width: "60%"
        }}
      ></div>
      {/* <GoogleMap
        center={isUserInput ? center : location}
        zoom={zoom}
        mapContainerStyle={{
          height: "40%",
          width: "40%"
        }}
        id="example-map"
      >
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </Autocomplete>
      </GoogleMap> */}
      <MapsSideScroller />
    </div>
    // </LoadScript>
  );
};

export default Maps;
