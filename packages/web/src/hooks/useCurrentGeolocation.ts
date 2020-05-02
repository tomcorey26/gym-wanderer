import { useState, useEffect } from 'react';

export const useCurrentGeolocation = () => {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState<string | null>(null);
  const [locationFound, setLocationFound] = useState<boolean>(false);

  //only want location to be loaded when geolocation is found

  useEffect(() => {
    const onChange = ({ coords }) => {
      if (!locationFound) setLocationFound(true);

      setPosition({
        lat: coords.latitude,
        lng: coords.longitude,
      });
    };
    const onError = (error) => {
      setError(error.message);
    };

    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return;
    }
    let watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { position, locationFound, error };
};
