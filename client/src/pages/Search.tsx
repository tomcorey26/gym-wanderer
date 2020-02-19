import React, { useEffect, useState, useReducer } from "react";
import MapsSideScroller from "../components/MapsSideScroller";
import { Coords } from "../types/Coords";
import { Gym } from "../types/Gym";
import useCurrentGeolocation from "../hooks/useCurrentLocation";
import GoogleMapReact from "google-map-react";
import MapPoint from "../components/MapPoint";
import RadiusSelect from "../components/RadiusSelect";
import { Key } from "../key";
import axios from "axios";
import SearchFilter from "../components/SearchFilter";
import { useInputValue } from "../hooks/useInputValue";

const Search: React.FC = () => {
  const geo = useCurrentGeolocation();
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });
  const [radiusDist, setRadiusDist] = useState<any>(10);
  const [zoom, setZoom] = useState<number>(11);
  const [autoComplete, setAutoComplete] = useState<any>(null);
  const [gyms, setGyms] = useState<Array<Gym>>([]);
  const [hoveredGymId, setHoveredGymId] = useState<number>(0);
  const { value, onChange } = useInputValue("");

  useEffect(() => {
    axios.get("/api/gyms").then((res: any) => {
      setGyms(res.data.gyms);
    });
  }, []);

  //another use effect that finds the elements with id and highlights them
  //based off of current state
  //need some should component updates

  const isWithinDistance = (
    center: Coords,
    point: Coords,
    distance: number
  ) => {
    let withinLong =
      point.lng > center.lng - distance && point.lng < center.lng + distance;
    let withinLat =
      point.lat > center.lat - distance && point.lat < center.lat + distance;

    return withinLong && withinLat;
  };

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

  let filteredGyms = gyms;
  if (value) {
    filteredGyms = gyms.filter(gym =>
      gym.gymName.toLowerCase().includes(value.toLowerCase())
    );
  }

  return (
    <div
      className="search-gym-page"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        overflow: "auto"
      }}
    >
      <div
        className="gym-map"
        style={{
          height: "100%",
          width: "50%",
          position: "sticky",
          top: 0,
          background: "blue"
        }}
      >
        {geo.locationFound ? (
          <GoogleMapReact zoom={zoom} center={geo.position}>
            {filteredGyms.map(({ location, cost, id }, i) =>
              isWithinDistance(
                geo.position,
                location.coordinates,
                radiusDist
              ) ? (
                <MapPoint
                  isHovered={id === hoveredGymId}
                  onMouseOver={() => setHoveredGymId(id)}
                  onMouseLeave={() => setHoveredGymId(0)}
                  key={i}
                  lat={location.coordinates.lat + 0.001}
                  lng={location.coordinates.lng + 0.001}
                  text={`${cost}/hr`}
                />
              ) : null
            )}
          </GoogleMapReact>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div style={{ width: "50%" }} className="scroller-box">
        <div style={{ display: "flex" }} className="top-bar">
          <SearchFilter value={value} onChange={onChange} />
          <RadiusSelect radiusDist={radiusDist} setRadiusDist={setRadiusDist} />
        </div>
        <MapsSideScroller
          onMouseOver={setHoveredGymId}
          onMouseLeave={() => setHoveredGymId(0)}
          gyms={filteredGyms}
          hoveredGymId={hoveredGymId}
        />
      </div>
    </div>
  );
};
//{"lat":41.8288777,"lng":-71.39347599999999}
export default Search;
