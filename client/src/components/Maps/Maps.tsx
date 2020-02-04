import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Key } from "../../key";

interface Coords {
  lat: number;
  lng: number;
}

const Maps: React.FC = () => {
  const location = useCurrentGeolocation();
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });
  const [zoom, setZoom] = useState<number>(11);

  return (
    <div>
      <LoadScript id="script-loader" googleMapsApiKey={Key}>
        <GoogleMap
          center={location}
          zoom={zoom}
          mapContainerStyle={{
            height: "400px",
            width: "800px"
          }}
          id="example-map"
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

function useCurrentGeolocation() {
  const [center, setCenter] = useState<Coords>({ lat: 41.4901, lng: -71.3128 });

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos: any) {
    var crd = pos.coords;
    setCenter({ lat: crd.latitude, lng: crd.longitude });
    console.log("fart");
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return center;
}

export default Maps;
