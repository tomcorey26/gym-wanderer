import React, { useState } from "react";
import { Coords } from "../types/Coords";

const LocationSearch = () => {
  const [autoComplete, setAutoComplete] = useState<any>(null);
  const [center, setCenter] = useState<Coords>({
    lat: 0,
    lng: 0
  });
  const [isUserInput, setIsUserInput] = useState<boolean>(false);

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
    <div>
      <h1>foo</h1>
    </div>
  );
};

export default LocationSearch;
