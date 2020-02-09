import { useState, useEffect } from "react";
import { Coords } from "../types/Coords";
export default function useCurrentGeolocation() {
  const [center, setCenter] = useState<Coords>({ lat: 41.4901, lng: -71.3128 });

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos: any) {
    var crd = pos.coords;
    setCenter({ lat: crd.latitude, lng: crd.longitude });
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [options]);

  return center;
}
