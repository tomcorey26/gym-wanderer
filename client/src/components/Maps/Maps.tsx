import React, { useEffect, useState, useReducer } from "react";
import "./Maps.scss";
import MapsSideScroller from "../MapsSideScroller/MapsSideScroller";
import { Coords } from "../../types/Coords";
import { Gym } from "../../types/Gym";
import useCurrentGeolocation from "../../hooks/useCurrentLocation";
import GoogleMapReact from "google-map-react";
import MapPoint from "../MapPoint/MapPoint";
import { Key } from "../../key";
import axios from "axios";

const Maps: React.FC = () => {
  const geo = useCurrentGeolocation();
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });
  const [zoom, setZoom] = useState<number>(11);
  const [autoComplete, setAutoComplete] = useState<any>(null);
  const [gyms, setGyms] = useState<Array<Gym>>([]);
  const [hoveredGymId, setHoveredGymId] = useState<number>(0);

  useEffect(() => {
    axios.get("/api/gyms").then((res: any) => {
      setGyms(res.data.gyms);
    });
  }, []);

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
    <div
      className="search-gym-page"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        className="gym-map"
        style={{
          height: "100%",
          width: "50%"
        }}
      >
        {geo.locationFound ? (
          <GoogleMapReact zoom={zoom} center={geo.position}>
            {gyms.map(({ location, cost, id }, i) => (
              <MapPoint
                isHovered={id === hoveredGymId}
                onMouseOver={() => setHoveredGymId(id)}
                onMouseLeave={() => setHoveredGymId(0)}
                key={i}
                lat={location.coordinates.lat + 0.001}
                lng={location.coordinates.lng + 0.001}
                text={`${cost}/hr`}
              />
            ))}
          </GoogleMapReact>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <MapsSideScroller
        onMouseOver={setHoveredGymId}
        onMouseLeave={() => setHoveredGymId(0)}
        gyms={gyms}
        hoveredGymId={hoveredGymId}
      />
    </div>
  );
};
//{"lat":41.8288777,"lng":-71.39347599999999}
export default Maps;
