import React, { useEffect, useState } from "react";
import "./Maps.scss";
import MapsSideScroller from "../MapsSideScroller/MapsSideScroller";
import { Coords } from "../../types/Coords";
import useCurrentGeolocation from "../../hooks/useCurrentLocation";
import GoogleMapReact from "google-map-react";
import { Key } from "../../key";
import axios from "axios";

interface poop {
  lat: any;
  lng: any;
  text: any;
}
const AnyReactComponent: React.FC<poop> = ({ text }) => (
  <div style={{ width: "100px", height: "100px", background: "grey" }}>
    {text}
  </div>
);

const Maps: React.FC = () => {
  const geo = useCurrentGeolocation();
  const [isUserInput, setIsUserInput] = useState<boolean>(false);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });
  const [zoom, setZoom] = useState<number>(11);
  const [autoComplete, setAutoComplete] = useState<any>(null);
  const [gyms, setGyms] = useState<any>([]);

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
          height: "40%",
          width: "50%"
        }}
      >
        {geo.locationFound ? (
          <GoogleMapReact zoom={zoom} center={geo.position}>
            <AnyReactComponent
              lat={geo.position.lat}
              lng={geo.position.lng}
              text="ey buddy"
            />
          </GoogleMapReact>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <MapsSideScroller gyms={gyms} />
    </div>
  );
};
//{"lat":41.8288777,"lng":-71.39347599999999}
export default Maps;
